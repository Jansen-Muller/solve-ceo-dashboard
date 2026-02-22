'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import Link from 'next/link';

interface HealthCheckRecord {
  id: string;
  status: string;
  created_at: string;
}

export default function HomePage() {
  const [healthStatus, setHealthStatus] = useState<string | null>(null);
  const [healthRecords, setHealthRecords] = useState<HealthCheckRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const checkHealth = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch health_check records
        const { data, error: fetchError } = await supabase
          .from('health_check')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (fetchError) {
          // If table doesn't exist, create it
          if (fetchError.message.includes('relation "public.health_check" does not exist')) {
            setError(
              'Health check table not found. Please create it in your Supabase dashboard.'
            );
          } else {
            setError(fetchError.message);
          }
          setHealthStatus('ERROR');
        } else {
          setHealthRecords(data || []);
          setHealthStatus('OK');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setHealthStatus('ERROR');
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                SOLVE CEO Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="px-4 py-12 sm:px-0">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to SOLVE CEO Dashboard
            </h2>
            <p className="text-xl text-gray-600">
              A production-ready Next.js application with Supabase integration
            </p>
          </div>

          {/* Database Connection Status */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Database Connection Status
            </h3>

            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-4 text-gray-600">Checking database...</span>
              </div>
            )}

            {!loading && (
              <>
                <div className="mb-6">
                  <div className="flex items-center">
                    <div
                      className={`h-4 w-4 rounded-full mr-3 ${
                        healthStatus === 'OK' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    ></div>
                    <span className="text-lg font-medium text-gray-900">
                      Status:{' '}
                      <span
                        className={
                          healthStatus === 'OK'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }
                      >
                        {healthStatus}
                      </span>
                    </span>
                  </div>
                </div>

                {error && (
                  <div className="rounded-md bg-red-50 p-4 mb-6">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                )}

                {healthStatus === 'OK' && healthRecords.length > 0 && (
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                      Recent Health Checks
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Created At
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {healthRecords.map((record) => (
                            <tr key={record.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {record.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {record.status}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(record.created_at).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {healthStatus === 'OK' && healthRecords.length === 0 && (
                  <p className="text-gray-600">
                    Database connection successful, but no health check records
                    found. Add some records to see them here.
                  </p>
                )}
              </>
            )}
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl mb-4">🔐</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Email Authentication
              </h4>
              <p className="text-gray-600">
                Secure email-based login powered by Supabase Auth
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl mb-4">🛡️</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Protected Routes
              </h4>
              <p className="text-gray-600">
                Dashboard route protected with authentication middleware
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl mb-4">📊</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Database Ready
              </h4>
              <p className="text-gray-600">
                Supabase Postgres integration with real-time capabilities
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
