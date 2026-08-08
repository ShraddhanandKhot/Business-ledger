import { supabase } from "@/lib/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

export type DbCustomer = {
  id: string;
  name: string;
  phone?: string;
  address?: string;
};

export async function getSession(): Promise<Session | null> {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw error;
  }
  return data.session;
}

export async function getOrCreateBusiness(user: User): Promise<string> {
  const { data, error } = await supabase
    .from("businesses")
    .select("id")
    .eq("owner_id", user.id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (data?.id) {
    return data.id;
  }

  const name = user.email ? `${user.email}'s Business` : "My Business";
  const { data: inserted, error: insertError } = await supabase
    .from("businesses")
    .insert({ owner_id: user.id, name })
    .select("id")
    .single();

  if (insertError) {
    throw insertError;
  }

  return inserted.id;
}

export async function loadCustomers(businessId: string): Promise<DbCustomer[]> {
  const { data, error } = await supabase
    .from("customers")
    .select("id, name, phone, address")
    .eq("business_id", businessId);

  if (error) {
    throw error;
  }

  return data || [];
}

export async function createCustomer(
  businessId: string,
  customer: { name: string; phone?: string; address?: string }
): Promise<DbCustomer> {
  const { data, error } = await supabase
    .from("customers")
    .insert({ business_id: businessId, ...customer })
    .select("id, name, phone, address")
    .single();

  if (error) {
    throw error;
  }

  return data;
}
