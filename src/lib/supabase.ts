import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tisxmsuntkzwgamiupex.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpc3htc3VudGt6d2dhbWl1cGV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MzgyNDEsImV4cCI6MjA5MTUxNDI0MX0.lebBJLNr0a1tKs5B4nhXiiJ5DCX46paQL4x8HKJfR8I'

export const supabase = createClient(supabaseUrl, supabaseKey)