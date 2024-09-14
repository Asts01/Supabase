
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dnxkpncvxmjqnvkxytla.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRueGtwbmN2eG1qcW52a3h5dGxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxMzgxNjIsImV4cCI6MjA0MTcxNDE2Mn0.6ePnsRzS5ECrMKrC0oigsZ_ugYcrUj7kE3sl7vxG7cA'
export const supabase = createClient(supabaseUrl, supabaseKey)