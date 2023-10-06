<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class VehicleController extends Controller
{
    function newcar(Request $request)
    {
        $user = $request->user();
        try {
            $validated = $request->validate([
                'plate_number' => 'required|string|min:5|max:12',
                'brand' => 'required|string|min:2|max:255',
                'type' => 'required|string|min:1|max:255',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'A jármű felvitele sikertelen!',
                'errors' => $e->errors(),
            ], 422);
        }

        $vehicle = $user->vehicles()->create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'A jármű sikeresen létrehozva!',
            'vehicle' => $vehicle
        ], 201);
    }

    function getcars(Request $request)
    {
        $user = $request->user();

        try {
            $vehicles = $user->vehicles()->get();
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'A járművek lekérdezése sikertelen!',
                'errors' => $e->errors(),
            ], 422);
        }

        return response()->json([
            'status' => 'success',
            'vehicles' => $vehicles
        ], 200);
    }

    function deletecar(Request $request)
    {
        $user = $request->user();

        try {
            $validated = $request->validate([
                'id' => 'required|integer',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'A jármű törlése sikertelen!',
                'errors' => $e->errors(),
            ], 422);
        }

        $vehicle = Vehicle::find($validated['id']);

        if ($vehicle->user_id != $user->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'A jármű törlése sikertelen!',
                'errors' => 'Nem a te járműved!',
            ], 422);
        }

        $vehicle->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'A jármű sikeresen törölve!',
        ], 200);
    }

    function selectcar(Request $request)
    {
        $user = $request->user();

        try {
            $validated = $request->validate([
                'id' => 'required|integer',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'A jármű kiválasztása sikertelen!',
                'errors' => $e->errors(),
            ], 422);
        }

        $vehicle = Vehicle::find($validated['id']);

        if ($vehicle->user_id != $user->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'A jármű kiválasztása sikertelen!',
                'errors' => 'Nem a te járműved!',
            ], 422);
        }

       /*  $user->selected_vehicle_id = $vehicle->id; */

        return response()->json([
            'status' => 'success',
            'message' => 'A jármű sikeresen kiválasztva!',
            'vehicle' => $vehicle
        ], 200);
    }

    function updatecar(Request $request) 
    {
        $user = $request->user();

        try {
            $validated = $request->validate([
                'id' => 'required|integer',
                'plate_number' => 'required|string|min:5|max:12',
                'brand' => 'required|string|min:2|max:255',
                'type' => 'required|string|min:1|max:255',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'A jármű módosítása sikertelen!',
                'errors' => $e->errors(),
            ], 422);
        }

        $vehicle = Vehicle::find($validated['id']);

        if ($vehicle->user_id != $user->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'A jármű módosítása sikertelen!',
                'errors' => 'Nem a te járműved!',
            ], 422);
        }

        $vehicle->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'A jármű sikeresen módosítva!',
            'vehicle' => $vehicle
        ], 200);
    }
 
}
