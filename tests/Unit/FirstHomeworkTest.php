<?php

namespace Tests\Unit;

use Exception;
use PHPUnit\Framework\TestCase;

/**
 * The point of this exercise is to learn PHP just a little bit.
 *
 * For the purposes of this task you are not allowed to use helpers from Laravel's Str class.
 *
 * Use only PHP builtin functions.
 *
 * Good luck, you're gonna need it.
 */
class FirstHomeworkTest extends TestCase
{
    private function previewer(
        string $haystack,
        string $needle,
        int $length = 0,
        string $replacement = '...'
    ) {

        $encoding = 'UTF-8';

        $index = mb_strpos($haystack, $needle, 0, $encoding);
        if ($index === false) {
            return '';
        }

        $haystackLen = mb_strlen($haystack, 'UTF-8');
        $needleLen = mb_strlen($needle, 'UTF-8');

        $start = $index < $length ? 0 : $index - $length;
        $end = $index + $needleLen + $length;
        $len = $end - $start;

        $haystackSubstr = mb_substr($haystack, $start, $len, $encoding);

        var_dump($start, $end, $haystackSubstr);

        $prepend = $start > 0 ? $replacement : '';
        $append = $end < $haystackLen ? $replacement : '';

        return $prepend . $haystackSubstr . $append;
    }

    public function test_previewer(): void
    {
        $this->assertEquals(
            '...are enjoying lea...',
            $this->previewer('Hope you are enjoying learning PHP lol', 'enjoying', 4, '...')
        );

        $this->assertEquals(
            'This...',
            $this->previewer('This is some sentence', 'This', 0)
        );

        $this->assertEquals(
            'highlighting',
            $this->previewer('The previewer function could be useful when implementing search highlighting', 'highlighting', 0, '')
        );

        $this->assertEquals(
            '...℘ⓐℙℇž...',
            $this->previewer('your function should also handle non-latin characters like Łüḱḁ ℘ⓐℙℇž for example', '℘ⓐℙℇž', 0)
        );

        $this->assertEquals(
            '',
            $this->previewer('if the match is not found then an empty string should be returned', 'this phrase does not exist', 0)
        );
    }
}
