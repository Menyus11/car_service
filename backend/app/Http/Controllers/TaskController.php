<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TaskController extends Controller
{
    function newtask(Request $request)
    {
        $user = $request->user();
        try {
            $validated = $request->validate([
                'plate_number' => 'required|string|min:3|max:12',
                'service_date' => 'required|string',
                'service_time' => 'required|integer',
                'aircondition_service' => 'nullable|integer',
                'brake_service' => 'nullable|integer',
                'carwash' => 'nullable|integer',
                'oil_change' => 'nullable|integer',
                'tire_service' => 'nullable|integer',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'A foglalás felvitele sikertelen!',
                'errors' => $e->errors(),
            ], 422);
        }

        $task = $user->tasks()->create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'A foglalás sikeresen létrehozva!',
            'task' => $task,
        ], 201);
    }

    function alltasks(Request $request)
    {
        $user = $request->user();

        try {
            $tasks = Task::all();
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'A foglalások lekérdezése sikertelen!',
                'errors' => $e->errors(),
            ], 422);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'A foglalások sikeresen lekérdezve!',
            'tasks' => $tasks
        ], 200);
    }


}
