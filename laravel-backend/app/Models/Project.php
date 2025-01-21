<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    // Enable timestamps (this is true by default, but include it for clarity)
    public $timestamps = true;

    // Mass-assignable fields
    protected $fillable = ['name', 'description', 'status'];
}
