import { createClient } from '@supabase/supabase-js'

const URL = 'https://rybyiftmkkdtohtblqjw.supabase.co'

const API_KEY = 'sb_publishable_m-vuLBIQehIZpmvgcTHitw_Bw0J2NSg'

export const supabase = createClient(URL, API_KEY)