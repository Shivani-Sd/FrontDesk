import { StaticImport } from "next/dist/shared/lib/get-img-props";

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

export enum TableHeaders {
  CreatedOn = "createdOn",
  Payer = "payer",
  Status = "status",
  Email = "email",
  PayerPhone = "payerPhone",
  Services = "services",
  Scheduled = "scheduled",
}

export enum TableHeaderValues {
  CreatedOn = "Created On",
  Payer = "Payer",
  Status = "Status",
  Email = "Email",
  PayerPhone = "Payer Phone",
  Services = "Services",
  Scheduled = "Scheduled",
}

export enum TableHeaderDescriptiveValues {
  CreatedOn = "Order Created On",
  Payer = "Payer",
  Status = "Status",
  Email = "Email",
  PayerPhone = "Payer Phone",
  Services = "Services",
  Scheduled = "Scheduled",
}

export interface TableHeader {
  id: number;
  name: TableHeaders;
  value: TableHeaderValues;
  descriptiveValue: TableHeaderDescriptiveValues;
  icon: string | StaticImport;
  width: number;
  hidden: boolean;
}

export interface TableRow {
  id: number;
  createdOn: Date;
  payer: string;
  status: Status;
  email: string;
  payerPhone: string;
  services: string;
  scheduled: Date;
}
