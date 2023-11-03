<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCompanyRequest;
use App\Http\Resources\CompanyResource;
use App\Http\Resources\V1\CompanyCollection;
use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function index () 
    {
        return new CompanyCollection(Company::all());
    }

    public function show(Company $company) 
    {
        return new CompanyResource($company);
    }

    public function store(StoreCompanyRequest $request) 
    {
       Company::create($request->validated());
       return response()->json("Successfully Created");
    }

    public function update(StoreCompanyRequest $request, Company $company)
    {
        $company->update($request->validated());
        return response()->json("SuccessFully Updated");
    }

    public function destroy(Company $company) 
    {
        $company->delete();
        return response()->json('Successfully Deleted');
    }
}
