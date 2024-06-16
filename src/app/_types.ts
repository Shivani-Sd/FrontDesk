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

export enum Filters {
  Scheduled = "Scheduled Date",
  People = "People",
  Offerings = "Services / Products",
}

export enum ScheduledDateFilter {
  All = "All",
  Custom = "Custom",
  LastThirtyDays = "Last 30 days",
  ThisMonth = "This month",
  LastMonth = "Last month",
  ThisQuarter = "This quarter",
  PastQuarter = "2 quarter ago",
  ThisYear = "This year",
  LastYear = "Last year",
}

export enum ServiceTagFilterAdditionalOptions {
  ServiceType = "Show all service type",
  ServiceStatus = "Show all",
}

export interface Waitlist {
  id: number;
  createdOn: string;
  payer: string;
  status: Status;
  email: string;
  payerPhone: string;
  services: string;
  serviceType: ServiceType;
  serviceStatus: ServiceStatus;
  scheduled: string;
}

export interface PaginationProps {
  offset: number;
  limit: number;
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
  createdOn: string;
  payer: string;
  status: Status;
  email: string;
  payerPhone: string;
  services: string;
  scheduled: string;
}

export interface Filter {
  name: Filters;
  icon: string | StaticImport;
}

export interface FilterValues {
  [Filters.Scheduled]: {
    type: ScheduledDateFilter;
    startDate: string | null;
    endDate: string | null;
  };
  [Filters.People]: {
    id: number;
    value: string;
  }[];
  [Filters.Offerings]: {
    filteredValues: {
      id: number;
      value: string;
    }[];
    serviceType: ServiceTypeFilter;
    serviceStatus: ServiceStatusFilter;
  };
}

export type ServiceTypeFilter =
  | ServiceType
  | ServiceTagFilterAdditionalOptions.ServiceType
  | null;

export type ServiceStatusFilter =
  | ServiceStatus
  | ServiceTagFilterAdditionalOptions.ServiceStatus
  | null;
