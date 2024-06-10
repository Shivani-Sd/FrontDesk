export enum Status {
  Active = "Active",
  Inactive = "Inactive",
  Lead = "Lead",
}

export enum ServiceType {
  Class = "Class",
  Appointment = "Appointment",
  Facility = "Facility",
  ClassPack = "Class Pack",
  Membership = "Membership",
  GeneralItems = "General Items",
}

export enum ServiceStatus {
  Public = "Public",
  Private = "Private",
  Disable = "Disable",
  Draft = "Draft",
}

export interface Waitlist {
  id: number;
  createdOn: Date;
  payer: string;
  status: Status;
  email: string;
  payerPhone: string;
  services: string;
  serviceType: ServiceType;
  serviceStatus: ServiceStatus;
  scheduled: Date;
}

export interface PaginationProps {
  offset: number;
  limit: number;
}
