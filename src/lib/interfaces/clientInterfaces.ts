export interface ClientFormData {
  id?: string;
  companyName: string;
  email: string;
  telephone: string;
  address: string;
  OIB: string;
}

export interface Client extends ClientFormData {
  id: string;
}
