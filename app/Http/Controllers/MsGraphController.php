<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;

class MsGraphController extends Controller
{
    public function redirectToMicrosoft()
{
    $query = http_build_query([
        'client_id' => env('GRAPH_CLIENT_ID'),
        'response_type' => 'code',
        'redirect_uri' => env('GRAPH_REDIRECT_URI'),
        'response_mode' => 'query',
        'scope' => 'offline_access Files.Read.All Sites.Read.All User.Read',
        'state' => csrf_token()
    ]);

    return redirect("https://login.microsoftonline.com/" . env('GRAPH_TENANT_ID') . "/oauth2/v2.0/authorize?$query");
}

public function handleCallback(Request $request)
{
    \Log::info('Received MS callback', [
        'code' => $request->input('code'),
        'params' => $request->all(),
    ]);

    if (!$request->has('code')) {
        return response()->json([
            'error' => 'Missing authorization code',
            'details' => $request->all()
        ], 400);
    }

    $response = Http::asForm()->withHeaders([
        'Content-Type' => 'application/x-www-form-urlencoded',
    ])->post("https://login.microsoftonline.com/" . env('GRAPH_TENANT_ID') . "/oauth2/v2.0/token", [
        'grant_type' => 'authorization_code',
        'client_id' => env('GRAPH_CLIENT_ID'),
        'client_secret' => env('GRAPH_CLIENT_SECRET'),
        'redirect_uri' => env('GRAPH_REDIRECT_URI'),
        'code' => $request->input('code'),
    ]);

    $tokenData = $response->json();

    if (isset($tokenData['access_token'])) {
        Session::put('graph_token', $tokenData['access_token']);
        return redirect('/qubedashboard');
    }

    \Log::error('Token exchange failed', ['response' => $tokenData]);

    return response()->json([
        'error' => 'Token exchange failed',
        'details' => $tokenData
    ], 500);
}

//For pulling the Excel Sheet
public function getUsedRange(Request $request)
{
    $token = Session::get('graph_token');

    if (!$token) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    $driveId = $request->query('driveId');
    $itemId = $request->query('itemId');
    $sheetName = $request->query('sheet', 'Form1');

    if (!$driveId || !$itemId) {
        return response()->json(['error' => 'Missing required parameters'], 400);
    }

    $graphUrl = "https://graph.microsoft.com/v1.0/drives/{$driveId}/items/{$itemId}/workbook/worksheets/{$sheetName}/usedRange";

    try {
        $response = Http::withOptions([
            'verify' => base_path('certs/cacert.pem'), // 👈 path to your cert file
        ])->withToken($token)->get($graphUrl);

        if ($response->successful()) {
            return $response->json();
        } else {
            // Log full Graph error
            \Log::error('Graph API failed', [
                'status' => $response->status(),
                'body' => $response->json()
            ]);
            return response()->json([
                'error' => 'Microsoft Graph API error',
                'details' => $response->json()
            ], $response->status());
        }
    } catch (\Exception $e) {
        // Log unexpected exception
        \Log::error('Graph API exception', ['exception' => $e]);
        return response()->json([
            'error' => 'Failed to fetch Excel data',
            'message' => $e->getMessage()
        ], 500);
    }
}

}
