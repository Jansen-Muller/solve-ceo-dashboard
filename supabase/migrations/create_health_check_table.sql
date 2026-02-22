-- Create health_check table for database connection verification
CREATE TABLE IF NOT EXISTS public.health_check (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status VARCHAR(50) NOT NULL DEFAULT 'ok',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create index on created_at for faster queries
CREATE INDEX IF NOT EXISTS health_check_created_at_idx ON public.health_check(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.health_check ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON public.health_check
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON public.health_check
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
