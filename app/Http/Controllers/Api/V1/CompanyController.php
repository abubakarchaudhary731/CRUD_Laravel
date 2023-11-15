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
        try {
            // Delete associated employees
            $company->employees()->delete(); 
    
            // Delete the company
            $company->delete(); 
    
            return response()->json('Successfully Deleted');
        } catch (\Exception $e) {
            // Log the error or handle it appropriately
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function destroyMultiple(Request $request)
    {
        $companyIds = $request->input('company_ids', []);
        if (!is_array($companyIds)) {
            return response()->json('Invalid company_ids provided', 400);
        } elseif (empty($companyIds)) {
            return response()->json('Empty company_ids provided', 400);
        }
        Company::deleteMultiple($companyIds);
        return response()->json(['message' => 'Successfully Deleted']);    
    }

}
