<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;

trait ManipulateFilesInPublicStorage
{
    protected function storeFileInPublicStorage($file, $path, $disk = 'public')
    {
        $filePath = Storage::disk($disk)->putFileAs($path, $file, uniqid());
        return Storage::disk($disk)->url($filePath);
    }

    protected function deleteFileFromPublicStorage($fileUrl, $disk = 'public')
    {
        if ($fileUrl) {
            $filePath = $this->getFilePathFromUrl($fileUrl);
            Storage::disk($disk)->delete($filePath);
        }
    }

    private function getFilePathFromUrl($url)
    {
        return str_replace('/storage/', '', parse_url($url, PHP_URL_PATH));
    }
}
