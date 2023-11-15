<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Employee extends Model
{
    use HasFactory;

    protected $fillable = ['first_name', 'last_name', 'company', 'email', 'phone'];

    public function campany(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'company');
    }

    public static function deleteMultiple(array $ids)
    {
    self::whereIn('id', $ids)->delete();
    }
}
