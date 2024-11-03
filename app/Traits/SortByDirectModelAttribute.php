<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;

trait SortByDirectModelAttribute
{

    protected function sortByDirectModelAttribute(Relation|Builder $query, array $sort): Relation|Builder
    {

        foreach ($sort as $key => $direction) {
            $query = $query->orderBy($key, $direction);
        }

        return $query;
    }
}
