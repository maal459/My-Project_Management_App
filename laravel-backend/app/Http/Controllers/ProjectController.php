<?php

namespace App\Http\Controllers;

use App\Models\Project; // Import the Project model
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Get all projects.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $projects = Project::all(); // Fetch all projects
            return response()->json($projects, 200); // Include timestamps in response
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to fetch projects'], 500); // Handle unexpected errors
        }
    }

    /**
     * Create a new project.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            // Validate the incoming request
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'status' => 'required|in:active,inactive,completed',
            ]);

            // Create the project
            $project = Project::create($validated);

            // Debug log for timestamps
            \Log::info('Project created successfully', $project->toArray());

            return response()->json($project, 201); // HTTP 201: Created
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422); // HTTP 422: Unprocessable Entity
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to create project'], 500); // Handle unexpected errors
        }
    }

    /**
     * Update an existing project.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            // Validate the incoming request
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'status' => 'required|in:active,inactive,completed',
            ]);

            // Find the project by ID
            $project = Project::findOrFail($id);

            // Update the project
            $project->update($validated);

            return response()->json($project, 200); // HTTP 200: OK
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422); // Validation errors
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Project not found'], 404); // HTTP 404: Not Found
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to update project'], 500); // Handle unexpected errors
        }
    }

    /**
     * Delete a project.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            // Find the project by ID
            $project = Project::findOrFail($id);

            // Delete the project
            $project->delete();

            return response()->json(['message' => 'Project deleted successfully'], 200); // HTTP 200: OK
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Project not found'], 404); // HTTP 404: Not Found
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to delete project'], 500); // Handle unexpected errors
        }
    }
}
