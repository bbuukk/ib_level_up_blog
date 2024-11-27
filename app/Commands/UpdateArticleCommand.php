<?php

namespace App\Commands;

use Illuminate\Support\Facades\DB;
use App\Traits\ManipulateFilesInPublicStorage;

class UpdateArticleCommand
{
    use ManipulateFilesInPublicStorage;

    private const MAX_VERSIONS = 0;

    public function __construct(
        private $article,
        private ?string $title,
        private ?string $content,
        private ?string $coverUrl
    ) {}

    public function execute()
    {
        DB::transaction(function () {

            //make versions storage capped for preventing excessive disk space usage
            $versionsCount = $this->article->versions()->count();
            if ($versionsCount > self::MAX_VERSIONS) {
                $oldestVersionsToDelete = $versionsCount - self::MAX_VERSIONS;

                $oldestVersions = $this->article->versions()
                    ->oldest()
                    ->limit($oldestVersionsToDelete)
                    ->get();

                foreach ($oldestVersions as $version) {
                    $coverUrl = $version->cover_url;

                    if ($coverUrl) {
                        $this->deleteFileFromPublicStorage($coverUrl);
                    }

                    $version->delete();
                }
            }

            $this->article->versions()->create([
                'title' => $this->article->title,
                'content' => $this->article->content,
                'cover_url' => $this->article->cover_url
            ]);

            $this->article->fill(array_filter([
                'title' => $this->title,
                'content' => $this->content,
                'cover_url' => $this->coverUrl
            ]));


            $this->article->save();
        });
    }
}
