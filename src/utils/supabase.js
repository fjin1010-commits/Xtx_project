import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zjtuvsajnwzofecpurln.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqdHV2c2Fqbnd6b2ZlY3B1cmxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MzQzNTYsImV4cCI6MjA3MjAxMDM1Nn0.Pu4cdg-PUVOrm47plbgcNyidNK2rd3KOdr6wLQiFWs4";
export const supabase = createClient(supabaseUrl, supabaseKey);
