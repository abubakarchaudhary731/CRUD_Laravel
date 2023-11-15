<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\V1\EmployeeCollection;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index () 
    {
        return new EmployeeCollection(Employee::all());
    }

    public function show(Employee $employee) 
    {
        return new EmployeeResource($employee);
    }

    public function store(StoreEmployeeRequest $request) 
    {
        Employee::create($request->validated());
        return response()->json("Successfully Created");
    }

    public function update(StoreEmployeeRequest $request, Employee $employee) 
    {
        $employee->update($request->validated());
        return response()->json("Employee Updated");
    }

    public function destroy(Employee $employee) 
    {
        $employee->delete();
        return response()->json('Successfully Deleted');
    }

    public function destroyMultiple(Request $request)
    {
        $employeeIds = $request->input('employee_ids', []);
        if (!is_array($employeeIds)) {
            return response()->json('Invalid employee_Ids provided', 400);
        } elseif (empty($employeeIds)) {
            return response()->json('Empty employee_Ids provided', 400);
        }
        Employee::deleteMultiple($employeeIds);
        return response()->json(['message' => 'Successfully Deleted']);    
    }

}
