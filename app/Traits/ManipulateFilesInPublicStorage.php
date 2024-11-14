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

}
