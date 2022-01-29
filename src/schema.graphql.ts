import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export enum AllowedBookingType {
  External = 'EXTERNAL',
  Internal = 'INTERNAL'
}

export enum AllowedMachineryFuelType {
  Buy = 'BUY',
  Recharge = 'RECHARGE',
  RechargeOthers = 'RECHARGE_OTHERS'
}

export enum AllowedMachineryType {
  Other = 'OTHER',
  Pickup = 'PICKUP',
  Truck = 'TRUCK'
}

export enum AllowedWorkCondition {
  Both = 'BOTH',
  Day = 'DAY',
  Travel = 'TRAVEL'
}

export type Billing = {
  __typename?: 'Billing';
  address: Scalars['String'];
  category: Scalars['String'];
  loads: Array<Loads>;
  name: Scalars['String'];
  phone: Scalars['String'];
  rut: Scalars['String'];
};

export type BillingInput = {
  address: Scalars['String'];
  category: Scalars['String'];
  loads: Array<LoadsInput>;
  name: Scalars['String'];
  phone: Scalars['String'];
  rut: Scalars['String'];
};

export type Booking = {
  __typename?: 'Booking';
  _id: Scalars['String'];
  address: Scalars['String'];
  building: Scalars['String'];
  client: Scalars['String'];
  company?: Maybe<Scalars['String']>;
  constructionManager?: Maybe<Scalars['String']>;
  endDate: Scalars['DateTime'];
  machines: Array<BookingMachinery>;
  receivers: Array<BookingReceiver>;
  startDate: Scalars['DateTime'];
  type: AllowedBookingType;
};

export type BookingInput = {
  _id?: InputMaybe<Scalars['String']>;
  address: Scalars['String'];
  building: Scalars['String'];
  client: Scalars['String'];
  company?: InputMaybe<Scalars['String']>;
  constructionManager?: InputMaybe<Scalars['String']>;
  endDate: Scalars['DateTime'];
  machines: Array<BookingMachineryInput>;
  receivers: Array<BookingReceiverInput>;
  startDate: Scalars['DateTime'];
  type: AllowedBookingType;
};

export type BookingMachinery = {
  __typename?: 'BookingMachinery';
  amountPerDay?: Maybe<Scalars['Float']>;
  amountPerHour?: Maybe<Scalars['Float']>;
  amountPerTravel?: Maybe<Scalars['Float']>;
  equipment: Scalars['String'];
  machineryType: AllowedMachineryType;
  minHours?: Maybe<Scalars['Float']>;
  operator: Scalars['String'];
  volume?: Maybe<Scalars['Float']>;
  workCondition?: Maybe<AllowedWorkCondition>;
};

export type BookingMachineryInput = {
  amountPerDay?: InputMaybe<Scalars['Float']>;
  amountPerHour?: InputMaybe<Scalars['Float']>;
  amountPerTravel?: InputMaybe<Scalars['Float']>;
  equipment: Scalars['String'];
  machineryType: AllowedMachineryType;
  minHours?: InputMaybe<Scalars['Float']>;
  operator: Scalars['String'];
  volume?: InputMaybe<Scalars['Float']>;
  workCondition?: InputMaybe<AllowedWorkCondition>;
};

export type BookingNotFound = {
  __typename?: 'BookingNotFound';
  message: Scalars['String'];
};

export type BookingReceiver = {
  __typename?: 'BookingReceiver';
  editable: Scalars['Boolean'];
  email: Scalars['String'];
};

export type BookingReceiverInput = {
  editable: Scalars['Boolean'];
  email: Scalars['String'];
};

export type ChangePasswordResultUnion = InactiveUser | Ok | TokenNotFound | UserNotFound | WrongChangePasswordCode;

export type Client = {
  __typename?: 'Client';
  _id: Scalars['String'];
  billing: Billing;
  name: Scalars['String'];
  paymentCondition: Scalars['String'];
  receivers: Array<Scalars['String']>;
};

export type ClientInput = {
  _id?: InputMaybe<Scalars['String']>;
  billing: BillingInput;
  name: Scalars['String'];
  paymentCondition: Scalars['String'];
  receivers: Array<Scalars['String']>;
};

export type ClientNotFound = {
  __typename?: 'ClientNotFound';
  message: Scalars['String'];
};

export type CodeAlreadyExists = {
  __typename?: 'CodeAlreadyExists';
  code: Scalars['String'];
};

export type CreateBookingResultUnion = Ok;

export type CreateClientResultUnion = Ok;

export type CreateEquipmentResultUnion = CodeAlreadyExists | Ok | PatentAlreadyExists;

export type CreateUserResultUnion = Ok | UserAlreadyExists;

export type DailyEquipmentsResume = {
  __typename?: 'DailyEquipmentsResume';
  machinery: Array<MachineryResume>;
  trucks: Array<TruckResume>;
};

export type DailyPayStateReport = {
  __typename?: 'DailyPayStateReport';
  amounType: Scalars['String'];
  amountPerUse: Scalars['Float'];
  building: Scalars['String'];
  client: Client;
  equipment: Equipment;
  hours: Scalars['Float'];
  minHours: Scalars['Float'];
  operator: Operator;
  toFacture: Scalars['Float'];
  totalAmount: Scalars['Float'];
};

export type DailyReport = {
  __typename?: 'DailyReport';
  extern: DailyEquipmentsResume;
  intern: DailyEquipmentsResume;
};

export type DeleteBookingInput = {
  _id: Scalars['String'];
};

export type DeleteBookingResultUnion = BookingNotFound | Ok;

export type DeleteClientInput = {
  _id: Scalars['String'];
};

export type DeleteClientResultUnion = ClientNotFound | Ok;

export type DeleteEquipmentInput = {
  _id: Scalars['String'];
};

export type DeleteEquipmentResultUnion = EquipmentNotFound | Ok;

export type DeleteMachineryJobRegistryInput = {
  _id: Scalars['String'];
};

export type DeleteMachineryJobRegistryResultUnion = MachineryJobRegistryNotFound | Ok;

export type DeleteUserInput = {
  _id: Scalars['String'];
};

export type DeleteUserResultUnion = ImmutableUser | Ok | UserNotFound;

export type Equipment = ExternalEquipment | InternalEquipment;

export type EquipmentForExternalBookings = {
  __typename?: 'EquipmentForExternalBookings';
  _id: Scalars['String'];
  address: Scalars['String'];
  building: Scalars['String'];
  client: Client;
  minHours: Scalars['Float'];
  operator: Scalars['String'];
  type: Scalars['String'];
  workCondition?: Maybe<Scalars['String']>;
};

export type EquipmentForInternalBookings = {
  __typename?: 'EquipmentForInternalBookings';
  _id: Scalars['String'];
  address: Scalars['String'];
  brand: Scalars['String'];
  building: Scalars['String'];
  client: Client;
  code: Scalars['String'];
  maintenanceClass?: Maybe<MaintenanceMachineryClass>;
  model: Scalars['String'];
  name: Scalars['String'];
  operator: User;
  patent: Scalars['String'];
  type: AllowedMachineryType;
  volume?: Maybe<Scalars['Float']>;
  workCondition?: Maybe<Scalars['String']>;
  year: Scalars['Float'];
};

export type EquipmentInput = {
  _id?: InputMaybe<Scalars['String']>;
  brand: Scalars['String'];
  code: Scalars['String'];
  maintenanceClass?: InputMaybe<MaintenanceMachineryClass>;
  model: Scalars['String'];
  name: Scalars['String'];
  patent: Scalars['String'];
  type: AllowedMachineryType;
  volume?: InputMaybe<Scalars['Float']>;
  year: Scalars['Float'];
};

export type EquipmentNotFound = {
  __typename?: 'EquipmentNotFound';
  message: Scalars['String'];
};

export type EquipmentsByBooking = {
  __typename?: 'EquipmentsByBooking';
  equipments: Array<EquipmentForInternalBookings>;
};

export type EquipmentsByBookingResultUnion = EquipmentsByBooking | ExternalEquipmentsByBooking;

export type ExternalEquipment = {
  __typename?: 'ExternalEquipment';
  name: Scalars['String'];
};

export type ExternalEquipmentsByBooking = {
  __typename?: 'ExternalEquipmentsByBooking';
  equipments: Array<EquipmentForExternalBookings>;
};

export type ExternalMachine = {
  __typename?: 'ExternalMachine';
  amountPerDay?: Maybe<Scalars['Float']>;
  amountPerHour?: Maybe<Scalars['Float']>;
  amountPerTravel?: Maybe<Scalars['Float']>;
  equipment: Scalars['String'];
  machineryType: AllowedMachineryType;
  minHours?: Maybe<Scalars['Float']>;
  operator: Scalars['String'];
  volume?: Maybe<Scalars['Float']>;
  workCondition?: Maybe<AllowedWorkCondition>;
};

export type ExternalOperator = {
  __typename?: 'ExternalOperator';
  name: Scalars['String'];
};

export type FindMachineryJobRegistryResultUnion = FullMachineryJobRegistry | MachineryJobRegistryNotFound;

export type FullBooking = {
  __typename?: 'FullBooking';
  _id: Scalars['String'];
  address: Scalars['String'];
  building: Scalars['String'];
  client: Scalars['String'];
  company?: Maybe<Scalars['String']>;
  constructionManager?: Maybe<Scalars['String']>;
  endDate: Scalars['DateTime'];
  machines: Array<Machine>;
  receivers: Array<BookingReceiver>;
  startDate: Scalars['DateTime'];
  type: AllowedBookingType;
};

export type FullMachineryFuelRegistry = {
  __typename?: 'FullMachineryFuelRegistry';
  _id: Scalars['String'];
  count: Scalars['Float'];
  date: Scalars['DateTime'];
  equipment: Equipment;
  guia?: Maybe<Scalars['Float']>;
  hourmeter?: Maybe<Scalars['Float']>;
  operator?: Maybe<Operator>;
  previousRegistry?: Maybe<Scalars['String']>;
  time: Scalars['String'];
  type: Scalars['String'];
};

export type FullMachineryJobRegistry = {
  __typename?: 'FullMachineryJobRegistry';
  _id: Scalars['String'];
  address: Scalars['String'];
  bookingWorkCondition?: Maybe<AllowedWorkCondition>;
  building: Scalars['String'];
  client: Client;
  date: Scalars['DateTime'];
  endHourmeter?: Maybe<Scalars['Float']>;
  equipment: Equipment;
  executor: User;
  folio: Scalars['Float'];
  load?: Maybe<Scalars['String']>;
  machineryType?: Maybe<AllowedMachineryType>;
  observations?: Maybe<Scalars['String']>;
  operator: Operator;
  signature?: Maybe<Scalars['String']>;
  startHourmeter?: Maybe<Scalars['Float']>;
  totalHours?: Maybe<Scalars['Float']>;
  totalTravels?: Maybe<Scalars['Float']>;
  workCondition?: Maybe<AllowedWorkCondition>;
  workingDayType?: Maybe<Scalars['String']>;
};

export type FullMaintenance = {
  __typename?: 'FullMaintenance';
  _id: Scalars['String'];
  equipment: Machinery;
  kmsOfMachinery: Scalars['Float'];
  maintenanceClass: MaintenanceMachineryClass;
  status?: Maybe<MaintenanceStatus>;
  step: Scalars['Float'];
  uid: Scalars['Float'];
};

export type GeneralPayStateEquipments = {
  __typename?: 'GeneralPayStateEquipments';
  OTHER: Array<GeneralPayStateMachinery>;
  TRUCK: Array<GeneralPayStateTruck>;
};

export type GeneralPayStateMachinery = {
  __typename?: 'GeneralPayStateMachinery';
  amountPerUse: Scalars['Float'];
  building: Scalars['String'];
  client: Client;
  date: Scalars['DateTime'];
  equipment: Equipment;
  folio: Scalars['String'];
  hours: Scalars['Float'];
  minHours: Scalars['Float'];
  operator: Operator;
  toFacture: Scalars['Float'];
  totalAmount: Scalars['Float'];
};

export type GeneralPayStateReport = {
  __typename?: 'GeneralPayStateReport';
  extern: GeneralPayStateEquipments;
  intern: GeneralPayStateEquipments;
};

export type GeneralPayStateTruck = {
  __typename?: 'GeneralPayStateTruck';
  amountPerUse: Scalars['Float'];
  building: Scalars['String'];
  client: Client;
  date: Scalars['DateTime'];
  equipment: Equipment;
  folio: Scalars['String'];
  load: Scalars['String'];
  operator: Operator;
  totalAmount: Scalars['Float'];
  totalTravels: Scalars['Float'];
  volume: Scalars['Float'];
  workCondition: AllowedWorkCondition;
  workingDayType: Scalars['String'];
};

export type ImmutableUser = {
  __typename?: 'ImmutableUser';
  _id: Scalars['String'];
  rut: Scalars['String'];
};

export type InactiveUser = {
  __typename?: 'InactiveUser';
  rut: Scalars['String'];
};

export type InternalEquipment = {
  __typename?: 'InternalEquipment';
  _id: Scalars['String'];
  brand: Scalars['String'];
  code: Scalars['String'];
  maintenanceClass?: Maybe<MaintenanceMachineryClass>;
  model: Scalars['String'];
  name: Scalars['String'];
  patent: Scalars['String'];
  type: AllowedMachineryType;
  volume?: Maybe<Scalars['Float']>;
  year: Scalars['Float'];
};

export type InternalMachine = {
  __typename?: 'InternalMachine';
  amountPerDay?: Maybe<Scalars['Float']>;
  amountPerHour?: Maybe<Scalars['Float']>;
  amountPerTravel?: Maybe<Scalars['Float']>;
  equipment: Machinery;
  machineryType: AllowedMachineryType;
  minHours?: Maybe<Scalars['Float']>;
  operator: User;
  volume?: Maybe<Scalars['Float']>;
  workCondition?: Maybe<AllowedWorkCondition>;
};

export type InternalOperator = {
  __typename?: 'InternalOperator';
  _id: Scalars['String'];
  email: Scalars['String'];
  isActive: Scalars['Boolean'];
  isSystemAdmin: Scalars['Boolean'];
  name: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
  rut: Scalars['String'];
  signature?: Maybe<Scalars['String']>;
};

export type Loads = {
  __typename?: 'Loads';
  amount: Scalars['Float'];
  type: Scalars['String'];
};

export type LoadsInput = {
  amount: Scalars['Float'];
  type: Scalars['String'];
};

export type Machine = ExternalMachine | InternalMachine;

export type Machinery = {
  __typename?: 'Machinery';
  _id: Scalars['String'];
  brand: Scalars['String'];
  code: Scalars['String'];
  maintenanceClass?: Maybe<MaintenanceMachineryClass>;
  model: Scalars['String'];
  name: Scalars['String'];
  patent: Scalars['String'];
  type: AllowedMachineryType;
  volume?: Maybe<Scalars['Float']>;
  year: Scalars['Float'];
};

export type MachineryFuelRegistryInput = {
  _id?: InputMaybe<Scalars['String']>;
  count: Scalars['Float'];
  date: Scalars['String'];
  equipment?: InputMaybe<Scalars['String']>;
  guia?: InputMaybe<Scalars['Float']>;
  hourmeter?: InputMaybe<Scalars['Float']>;
  operator?: InputMaybe<Scalars['String']>;
  previousRegistry?: InputMaybe<Scalars['String']>;
  time: Scalars['String'];
  type: AllowedMachineryFuelType;
};

export type MachineryFuelRegistryResultUnion = Ok;

export type MachineryJobRegistryInput = {
  _id?: InputMaybe<Scalars['String']>;
  address: Scalars['String'];
  bookingWorkCondition?: InputMaybe<Scalars['String']>;
  building?: InputMaybe<Scalars['String']>;
  client?: InputMaybe<Scalars['String']>;
  date: Scalars['String'];
  endHourmeter?: InputMaybe<Scalars['Float']>;
  equipment: Scalars['String'];
  load?: InputMaybe<Scalars['String']>;
  machineryType?: InputMaybe<AllowedMachineryType>;
  observations?: InputMaybe<Scalars['String']>;
  operator: Scalars['String'];
  signature?: InputMaybe<Scalars['String']>;
  startHourmeter?: InputMaybe<Scalars['Float']>;
  totalHours?: InputMaybe<Scalars['Float']>;
  totalTravels?: InputMaybe<Scalars['Float']>;
  workCondition?: InputMaybe<Scalars['String']>;
  workingDayType?: InputMaybe<Scalars['String']>;
};

export type MachineryJobRegistryNotFound = {
  __typename?: 'MachineryJobRegistryNotFound';
  message: Scalars['String'];
};

export type MachineryJobRegistryResultUnion = Ok;

export type MachineryMaintenance = {
  __typename?: 'MachineryMaintenance';
  _id: Scalars['String'];
  equipment: Scalars['String'];
  kmsOfMachinery: Scalars['Float'];
  maintenanceClass: MaintenanceMachineryClass;
  status?: Maybe<MaintenanceStatus>;
  step: Scalars['Float'];
  uid: Scalars['Float'];
};

export type MachineryResume = {
  __typename?: 'MachineryResume';
  address: Scalars['String'];
  building: Scalars['String'];
  endHourmeter: Scalars['Float'];
  equipment: Scalars['String'];
  observations: Scalars['String'];
  operator: Scalars['String'];
  startHourmeter: Scalars['Float'];
  totalHours: Scalars['Float'];
};

export enum MaintenanceMachineryClass {
  ClassA = 'CLASS_A',
  ClassB = 'CLASS_B'
}

export enum MaintenanceStatus {
  Done = 'DONE',
  Pending = 'PENDING'
}

export type Mutation = {
  __typename?: 'Mutation';
  changeMaintenanceStatus: MachineryMaintenance;
  changePasswordWithAuthCode: ChangePasswordResultUnion;
  createBooking: CreateBookingResultUnion;
  createClient: CreateClientResultUnion;
  createEquipment: CreateEquipmentResultUnion;
  createMachineryFuelRegistry: MachineryFuelRegistryResultUnion;
  createMachineryJobRegistry: MachineryJobRegistryResultUnion;
  createUser: CreateUserResultUnion;
  deleteBooking: DeleteBookingResultUnion;
  deleteClient: DeleteClientResultUnion;
  deleteEquipment: DeleteEquipmentResultUnion;
  deleteMachineryJobRegistry: DeleteMachineryJobRegistryResultUnion;
  deleteUser: DeleteUserResultUnion;
  updateBooking: UpdateBookingResultUnion;
  updateClient: UpdateClientResultUnion;
  updateEquipment: UpdateEquipmentResultUnion;
  updateMachineryJobRegistry: UpdateMachineryJobRegistryResultUnion;
  updateUser: UpdateUserResultUnion;
};


export type MutationChangeMaintenanceStatusArgs = {
  id: Scalars['String'];
};


export type MutationChangePasswordWithAuthCodeArgs = {
  form: NewPasswordInput;
};


export type MutationCreateBookingArgs = {
  form: BookingInput;
};


export type MutationCreateClientArgs = {
  form: ClientInput;
};


export type MutationCreateEquipmentArgs = {
  form: EquipmentInput;
};


export type MutationCreateMachineryFuelRegistryArgs = {
  form: MachineryFuelRegistryInput;
};


export type MutationCreateMachineryJobRegistryArgs = {
  form: MachineryJobRegistryInput;
};


export type MutationCreateUserArgs = {
  form: UserInput;
};


export type MutationDeleteBookingArgs = {
  form: DeleteBookingInput;
};


export type MutationDeleteClientArgs = {
  form: DeleteClientInput;
};


export type MutationDeleteEquipmentArgs = {
  form: DeleteEquipmentInput;
};


export type MutationDeleteMachineryJobRegistryArgs = {
  form: DeleteMachineryJobRegistryInput;
};


export type MutationDeleteUserArgs = {
  form: DeleteUserInput;
};


export type MutationUpdateBookingArgs = {
  form: UpdateBookingInput;
};


export type MutationUpdateClientArgs = {
  form: UpdateClientInput;
};


export type MutationUpdateEquipmentArgs = {
  form: UpdateEquipmentInput;
};


export type MutationUpdateMachineryJobRegistryArgs = {
  form: UpdateMachineryJobRegistryInput;
};


export type MutationUpdateUserArgs = {
  form: UpdateUserInput;
};

export type NewPasswordInput = {
  code: Scalars['String'];
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
  rut: Scalars['String'];
};

export type Ok = {
  __typename?: 'Ok';
  message?: Maybe<Scalars['String']>;
};

export type Operator = ExternalOperator | InternalOperator;

export type PatentAlreadyExists = {
  __typename?: 'PatentAlreadyExists';
  patent: Scalars['String'];
};

export type PayStateFilterBuilding = {
  __typename?: 'PayStateFilterBuilding';
  clientId: Scalars['String'];
  name: Scalars['String'];
};

export type PayStateFilterExternalMachine = {
  __typename?: 'PayStateFilterExternalMachine';
  fromBuilding: Array<Scalars['String']>;
  fromClient: Array<Scalars['String']>;
  name: Scalars['String'];
};

export type PayStateFilterInternalMachine = {
  __typename?: 'PayStateFilterInternalMachine';
  _id: Scalars['String'];
  brand: Scalars['String'];
  code: Scalars['String'];
  fromBuilding: Array<Scalars['String']>;
  fromClient: Array<Scalars['String']>;
  maintenanceClass?: Maybe<MaintenanceMachineryClass>;
  model: Scalars['String'];
  name: Scalars['String'];
  patent: Scalars['String'];
  type: AllowedMachineryType;
  volume?: Maybe<Scalars['Float']>;
  year: Scalars['Float'];
};

export type PayStateFilterMachine = PayStateFilterExternalMachine | PayStateFilterInternalMachine;

export type PayStateFilters = {
  __typename?: 'PayStateFilters';
  buildings: Array<PayStateFilterBuilding>;
  clients: Array<Client>;
  equipments: Array<PayStateFilterMachine>;
};

export type PayStatesFilter = {
  building?: InputMaybe<Scalars['String']>;
  client?: InputMaybe<Scalars['String']>;
  endDate: Scalars['String'];
  equipment?: InputMaybe<Scalars['String']>;
  startDate: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAllBookings: Array<Booking>;
  getAllClients: Array<Client>;
  getAllEquipments: Array<Machinery>;
  getAllEquipmentsByBuilding: EquipmentsByBookingResultUnion;
  getAllFuelRegistries: Array<FullMachineryFuelRegistry>;
  getAllLastMaintenance: Array<FullMaintenance>;
  getAllMachineryJobRegistry: Array<FullMachineryJobRegistry>;
  getAllMachineryJobRegistryByDate: Array<FullMachineryJobRegistry>;
  getAllMachineryJobRegistryByUserAndDate: Array<FullMachineryJobRegistry>;
  getAllPreviousFuelRegistries: Array<FullMachineryFuelRegistry>;
  getAllRoles: Array<Role>;
  getAllUsers: Array<User>;
  getAllUsersWithRoleName: Array<User>;
  getBookingsByDate: Array<FullBooking>;
  getBookingsForPayStates: PayStateFilters;
  getBuildingsByClientAndDate: Array<Booking>;
  getClient: Client;
  getDailyPayState: Array<DailyPayStateReport>;
  getDailyResume: DailyReport;
  getEquipmentPayState: GeneralPayStateReport;
  getMaintenancePage: Array<FullMaintenance>;
  getPreviousMachineryJobRegistry: FindMachineryJobRegistryResultUnion;
  getRecoverCode: RecoverCodeResultUnion;
  getUserNextJob: Array<Booking>;
};


export type QueryGetAllEquipmentsByBuildingArgs = {
  date: Scalars['String'];
  user: Scalars['String'];
};


export type QueryGetAllFuelRegistriesArgs = {
  endDate: Scalars['String'];
  startDate: Scalars['String'];
};


export type QueryGetAllMachineryJobRegistryByDateArgs = {
  date: Scalars['String'];
};


export type QueryGetAllMachineryJobRegistryByUserAndDateArgs = {
  endDate: Scalars['String'];
  startDate: Scalars['String'];
  user: Scalars['String'];
};


export type QueryGetAllPreviousFuelRegistriesArgs = {
  equipments: Array<Scalars['String']>;
};


export type QueryGetAllUsersWithRoleNameArgs = {
  role: Scalars['String'];
};


export type QueryGetBookingsByDateArgs = {
  date: Scalars['String'];
};


export type QueryGetBookingsForPayStatesArgs = {
  endDate: Scalars['String'];
  startDate: Scalars['String'];
};


export type QueryGetBuildingsByClientAndDateArgs = {
  client: Scalars['String'];
  date: Scalars['String'];
  equipment: Scalars['String'];
};


export type QueryGetClientArgs = {
  client: Scalars['String'];
};


export type QueryGetDailyPayStateArgs = {
  date: Scalars['String'];
};


export type QueryGetDailyResumeArgs = {
  date: Scalars['String'];
};


export type QueryGetEquipmentPayStateArgs = {
  filters: PayStatesFilter;
};


export type QueryGetMaintenancePageArgs = {
  equipment: Scalars['String'];
  lastUid: Scalars['Float'];
};


export type QueryGetPreviousMachineryJobRegistryArgs = {
  date: Scalars['String'];
  equipment: Scalars['String'];
  user: Scalars['String'];
};


export type QueryGetRecoverCodeArgs = {
  form: RecoverCodeInput;
};


export type QueryGetUserNextJobArgs = {
  date: Scalars['String'];
  user: Scalars['String'];
};

export type RecoverCodeInput = {
  rut: Scalars['String'];
};

export type RecoverCodeResultUnion = InactiveUser | Ok | UserNotFound;

export type Role = {
  __typename?: 'Role';
  _id: Scalars['String'];
  initialView: Scalars['String'];
  label: Scalars['String'];
  name: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  maintenanceAdded: FullMaintenance;
  maintenanceStatusUpdated: MachineryMaintenance;
};

export type TokenNotFound = {
  __typename?: 'TokenNotFound';
  message: Scalars['String'];
};

export type TruckResume = {
  __typename?: 'TruckResume';
  address: Scalars['String'];
  building: Scalars['String'];
  equipment: Scalars['String'];
  load: Scalars['String'];
  observations: Scalars['String'];
  operator: Scalars['String'];
  totalTravels: Scalars['Float'];
  volume: Scalars['Float'];
  workingDayType: Scalars['String'];
};

export type UpdateBookingInput = {
  _id: Scalars['String'];
  address: Scalars['String'];
  building: Scalars['String'];
  client: Scalars['String'];
  company?: InputMaybe<Scalars['String']>;
  constructionManager?: InputMaybe<Scalars['String']>;
  endDate: Scalars['DateTime'];
  machines: Array<BookingMachineryInput>;
  receivers: Array<BookingReceiverInput>;
  startDate: Scalars['DateTime'];
  type: AllowedBookingType;
};

export type UpdateBookingResultUnion = BookingNotFound | Ok;

export type UpdateClientInput = {
  _id: Scalars['String'];
  billing: BillingInput;
  name: Scalars['String'];
  paymentCondition: Scalars['String'];
  receivers: Array<Scalars['String']>;
};

export type UpdateClientResultUnion = ClientNotFound | Ok;

export type UpdateEquipmentInput = {
  _id: Scalars['String'];
  brand: Scalars['String'];
  code: Scalars['String'];
  maintenanceClass?: InputMaybe<MaintenanceMachineryClass>;
  model: Scalars['String'];
  name: Scalars['String'];
  patent: Scalars['String'];
  type: AllowedMachineryType;
  volume?: InputMaybe<Scalars['Float']>;
  year: Scalars['Float'];
};

export type UpdateEquipmentResultUnion = CodeAlreadyExists | EquipmentNotFound | Ok | PatentAlreadyExists;

export type UpdateMachineryJobRegistryInput = {
  _id: Scalars['String'];
  address: Scalars['String'];
  bookingWorkCondition?: InputMaybe<Scalars['String']>;
  building?: InputMaybe<Scalars['String']>;
  client?: InputMaybe<Scalars['String']>;
  date: Scalars['String'];
  endHourmeter?: InputMaybe<Scalars['Float']>;
  equipment: Scalars['String'];
  executor: Scalars['String'];
  folio: Scalars['Float'];
  load?: InputMaybe<Scalars['String']>;
  machineryType?: InputMaybe<AllowedMachineryType>;
  observations?: InputMaybe<Scalars['String']>;
  operator: Scalars['String'];
  signature?: InputMaybe<Scalars['String']>;
  startHourmeter?: InputMaybe<Scalars['Float']>;
  totalHours?: InputMaybe<Scalars['Float']>;
  totalTravels?: InputMaybe<Scalars['Float']>;
  workCondition?: InputMaybe<Scalars['String']>;
  workingDayType?: InputMaybe<Scalars['String']>;
};

export type UpdateMachineryJobRegistryResultUnion = MachineryJobRegistryNotFound | Ok;

export type UpdateUserInput = {
  _id: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  role: Scalars['String'];
  rut: Scalars['String'];
  signature?: InputMaybe<Scalars['String']>;
};

export type UpdateUserResultUnion = ImmutableUser | Ok | UserNotFound;

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  email: Scalars['String'];
  isActive: Scalars['Boolean'];
  isSystemAdmin: Scalars['Boolean'];
  name: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
  rut: Scalars['String'];
  signature?: Maybe<Scalars['String']>;
};

export type UserAlreadyExists = {
  __typename?: 'UserAlreadyExists';
  rut: Scalars['String'];
};

export type UserInput = {
  _id?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  role: Scalars['String'];
  rut: Scalars['String'];
  signature?: InputMaybe<Scalars['String']>;
};

export type UserNotFound = {
  __typename?: 'UserNotFound';
  message: Scalars['String'];
};

export type View = {
  __typename?: 'View';
  _id: Scalars['String'];
  children: Array<View>;
  icon: Scalars['String'];
  label: Scalars['String'];
  name: Scalars['String'];
};

export type WrongChangePasswordCode = {
  __typename?: 'WrongChangePasswordCode';
  message: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AdditionalEntityFields: AdditionalEntityFields;
  String: ResolverTypeWrapper<Scalars['String']>;
  AllowedBookingType: AllowedBookingType;
  AllowedMachineryFuelType: AllowedMachineryFuelType;
  AllowedMachineryType: AllowedMachineryType;
  AllowedWorkCondition: AllowedWorkCondition;
  Billing: ResolverTypeWrapper<Billing>;
  BillingInput: BillingInput;
  Booking: ResolverTypeWrapper<Booking>;
  BookingInput: BookingInput;
  BookingMachinery: ResolverTypeWrapper<BookingMachinery>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  BookingMachineryInput: BookingMachineryInput;
  BookingNotFound: ResolverTypeWrapper<BookingNotFound>;
  BookingReceiver: ResolverTypeWrapper<BookingReceiver>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BookingReceiverInput: BookingReceiverInput;
  ChangePasswordResultUnion: ResolversTypes['InactiveUser'] | ResolversTypes['Ok'] | ResolversTypes['TokenNotFound'] | ResolversTypes['UserNotFound'] | ResolversTypes['WrongChangePasswordCode'];
  Client: ResolverTypeWrapper<Client>;
  ClientInput: ClientInput;
  ClientNotFound: ResolverTypeWrapper<ClientNotFound>;
  CodeAlreadyExists: ResolverTypeWrapper<CodeAlreadyExists>;
  CreateBookingResultUnion: ResolversTypes['Ok'];
  CreateClientResultUnion: ResolversTypes['Ok'];
  CreateEquipmentResultUnion: ResolversTypes['CodeAlreadyExists'] | ResolversTypes['Ok'] | ResolversTypes['PatentAlreadyExists'];
  CreateUserResultUnion: ResolversTypes['Ok'] | ResolversTypes['UserAlreadyExists'];
  DailyEquipmentsResume: ResolverTypeWrapper<DailyEquipmentsResume>;
  DailyPayStateReport: ResolverTypeWrapper<Omit<DailyPayStateReport, 'equipment' | 'operator'> & { equipment: ResolversTypes['Equipment'], operator: ResolversTypes['Operator'] }>;
  DailyReport: ResolverTypeWrapper<DailyReport>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DeleteBookingInput: DeleteBookingInput;
  DeleteBookingResultUnion: ResolversTypes['BookingNotFound'] | ResolversTypes['Ok'];
  DeleteClientInput: DeleteClientInput;
  DeleteClientResultUnion: ResolversTypes['ClientNotFound'] | ResolversTypes['Ok'];
  DeleteEquipmentInput: DeleteEquipmentInput;
  DeleteEquipmentResultUnion: ResolversTypes['EquipmentNotFound'] | ResolversTypes['Ok'];
  DeleteMachineryJobRegistryInput: DeleteMachineryJobRegistryInput;
  DeleteMachineryJobRegistryResultUnion: ResolversTypes['MachineryJobRegistryNotFound'] | ResolversTypes['Ok'];
  DeleteUserInput: DeleteUserInput;
  DeleteUserResultUnion: ResolversTypes['ImmutableUser'] | ResolversTypes['Ok'] | ResolversTypes['UserNotFound'];
  Equipment: ResolversTypes['ExternalEquipment'] | ResolversTypes['InternalEquipment'];
  EquipmentForExternalBookings: ResolverTypeWrapper<EquipmentForExternalBookings>;
  EquipmentForInternalBookings: ResolverTypeWrapper<EquipmentForInternalBookings>;
  EquipmentInput: EquipmentInput;
  EquipmentNotFound: ResolverTypeWrapper<EquipmentNotFound>;
  EquipmentsByBooking: ResolverTypeWrapper<EquipmentsByBooking>;
  EquipmentsByBookingResultUnion: ResolversTypes['EquipmentsByBooking'] | ResolversTypes['ExternalEquipmentsByBooking'];
  ExternalEquipment: ResolverTypeWrapper<ExternalEquipment>;
  ExternalEquipmentsByBooking: ResolverTypeWrapper<ExternalEquipmentsByBooking>;
  ExternalMachine: ResolverTypeWrapper<ExternalMachine>;
  ExternalOperator: ResolverTypeWrapper<ExternalOperator>;
  FindMachineryJobRegistryResultUnion: ResolversTypes['FullMachineryJobRegistry'] | ResolversTypes['MachineryJobRegistryNotFound'];
  FullBooking: ResolverTypeWrapper<Omit<FullBooking, 'machines'> & { machines: Array<ResolversTypes['Machine']> }>;
  FullMachineryFuelRegistry: ResolverTypeWrapper<Omit<FullMachineryFuelRegistry, 'equipment' | 'operator'> & { equipment: ResolversTypes['Equipment'], operator?: Maybe<ResolversTypes['Operator']> }>;
  FullMachineryJobRegistry: ResolverTypeWrapper<Omit<FullMachineryJobRegistry, 'equipment' | 'operator'> & { equipment: ResolversTypes['Equipment'], operator: ResolversTypes['Operator'] }>;
  FullMaintenance: ResolverTypeWrapper<FullMaintenance>;
  GeneralPayStateEquipments: ResolverTypeWrapper<GeneralPayStateEquipments>;
  GeneralPayStateMachinery: ResolverTypeWrapper<Omit<GeneralPayStateMachinery, 'equipment' | 'operator'> & { equipment: ResolversTypes['Equipment'], operator: ResolversTypes['Operator'] }>;
  GeneralPayStateReport: ResolverTypeWrapper<GeneralPayStateReport>;
  GeneralPayStateTruck: ResolverTypeWrapper<Omit<GeneralPayStateTruck, 'equipment' | 'operator'> & { equipment: ResolversTypes['Equipment'], operator: ResolversTypes['Operator'] }>;
  ImmutableUser: ResolverTypeWrapper<ImmutableUser>;
  InactiveUser: ResolverTypeWrapper<InactiveUser>;
  InternalEquipment: ResolverTypeWrapper<InternalEquipment>;
  InternalMachine: ResolverTypeWrapper<InternalMachine>;
  InternalOperator: ResolverTypeWrapper<InternalOperator>;
  Loads: ResolverTypeWrapper<Loads>;
  LoadsInput: LoadsInput;
  Machine: ResolversTypes['ExternalMachine'] | ResolversTypes['InternalMachine'];
  Machinery: ResolverTypeWrapper<Machinery>;
  MachineryFuelRegistryInput: MachineryFuelRegistryInput;
  MachineryFuelRegistryResultUnion: ResolversTypes['Ok'];
  MachineryJobRegistryInput: MachineryJobRegistryInput;
  MachineryJobRegistryNotFound: ResolverTypeWrapper<MachineryJobRegistryNotFound>;
  MachineryJobRegistryResultUnion: ResolversTypes['Ok'];
  MachineryMaintenance: ResolverTypeWrapper<MachineryMaintenance>;
  MachineryResume: ResolverTypeWrapper<MachineryResume>;
  MaintenanceMachineryClass: MaintenanceMachineryClass;
  MaintenanceStatus: MaintenanceStatus;
  Mutation: ResolverTypeWrapper<{}>;
  NewPasswordInput: NewPasswordInput;
  Ok: ResolverTypeWrapper<Ok>;
  Operator: ResolversTypes['ExternalOperator'] | ResolversTypes['InternalOperator'];
  PatentAlreadyExists: ResolverTypeWrapper<PatentAlreadyExists>;
  PayStateFilterBuilding: ResolverTypeWrapper<PayStateFilterBuilding>;
  PayStateFilterExternalMachine: ResolverTypeWrapper<PayStateFilterExternalMachine>;
  PayStateFilterInternalMachine: ResolverTypeWrapper<PayStateFilterInternalMachine>;
  PayStateFilterMachine: ResolversTypes['PayStateFilterExternalMachine'] | ResolversTypes['PayStateFilterInternalMachine'];
  PayStateFilters: ResolverTypeWrapper<Omit<PayStateFilters, 'equipments'> & { equipments: Array<ResolversTypes['PayStateFilterMachine']> }>;
  PayStatesFilter: PayStatesFilter;
  Query: ResolverTypeWrapper<{}>;
  RecoverCodeInput: RecoverCodeInput;
  RecoverCodeResultUnion: ResolversTypes['InactiveUser'] | ResolversTypes['Ok'] | ResolversTypes['UserNotFound'];
  Role: ResolverTypeWrapper<Role>;
  Subscription: ResolverTypeWrapper<{}>;
  TokenNotFound: ResolverTypeWrapper<TokenNotFound>;
  TruckResume: ResolverTypeWrapper<TruckResume>;
  UpdateBookingInput: UpdateBookingInput;
  UpdateBookingResultUnion: ResolversTypes['BookingNotFound'] | ResolversTypes['Ok'];
  UpdateClientInput: UpdateClientInput;
  UpdateClientResultUnion: ResolversTypes['ClientNotFound'] | ResolversTypes['Ok'];
  UpdateEquipmentInput: UpdateEquipmentInput;
  UpdateEquipmentResultUnion: ResolversTypes['CodeAlreadyExists'] | ResolversTypes['EquipmentNotFound'] | ResolversTypes['Ok'] | ResolversTypes['PatentAlreadyExists'];
  UpdateMachineryJobRegistryInput: UpdateMachineryJobRegistryInput;
  UpdateMachineryJobRegistryResultUnion: ResolversTypes['MachineryJobRegistryNotFound'] | ResolversTypes['Ok'];
  UpdateUserInput: UpdateUserInput;
  UpdateUserResultUnion: ResolversTypes['ImmutableUser'] | ResolversTypes['Ok'] | ResolversTypes['UserNotFound'];
  User: ResolverTypeWrapper<User>;
  UserAlreadyExists: ResolverTypeWrapper<UserAlreadyExists>;
  UserInput: UserInput;
  UserNotFound: ResolverTypeWrapper<UserNotFound>;
  View: ResolverTypeWrapper<View>;
  WrongChangePasswordCode: ResolverTypeWrapper<WrongChangePasswordCode>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AdditionalEntityFields: AdditionalEntityFields;
  String: Scalars['String'];
  Billing: Billing;
  BillingInput: BillingInput;
  Booking: Booking;
  BookingInput: BookingInput;
  BookingMachinery: BookingMachinery;
  Float: Scalars['Float'];
  BookingMachineryInput: BookingMachineryInput;
  BookingNotFound: BookingNotFound;
  BookingReceiver: BookingReceiver;
  Boolean: Scalars['Boolean'];
  BookingReceiverInput: BookingReceiverInput;
  ChangePasswordResultUnion: ResolversParentTypes['InactiveUser'] | ResolversParentTypes['Ok'] | ResolversParentTypes['TokenNotFound'] | ResolversParentTypes['UserNotFound'] | ResolversParentTypes['WrongChangePasswordCode'];
  Client: Client;
  ClientInput: ClientInput;
  ClientNotFound: ClientNotFound;
  CodeAlreadyExists: CodeAlreadyExists;
  CreateBookingResultUnion: ResolversParentTypes['Ok'];
  CreateClientResultUnion: ResolversParentTypes['Ok'];
  CreateEquipmentResultUnion: ResolversParentTypes['CodeAlreadyExists'] | ResolversParentTypes['Ok'] | ResolversParentTypes['PatentAlreadyExists'];
  CreateUserResultUnion: ResolversParentTypes['Ok'] | ResolversParentTypes['UserAlreadyExists'];
  DailyEquipmentsResume: DailyEquipmentsResume;
  DailyPayStateReport: Omit<DailyPayStateReport, 'equipment' | 'operator'> & { equipment: ResolversParentTypes['Equipment'], operator: ResolversParentTypes['Operator'] };
  DailyReport: DailyReport;
  DateTime: Scalars['DateTime'];
  DeleteBookingInput: DeleteBookingInput;
  DeleteBookingResultUnion: ResolversParentTypes['BookingNotFound'] | ResolversParentTypes['Ok'];
  DeleteClientInput: DeleteClientInput;
  DeleteClientResultUnion: ResolversParentTypes['ClientNotFound'] | ResolversParentTypes['Ok'];
  DeleteEquipmentInput: DeleteEquipmentInput;
  DeleteEquipmentResultUnion: ResolversParentTypes['EquipmentNotFound'] | ResolversParentTypes['Ok'];
  DeleteMachineryJobRegistryInput: DeleteMachineryJobRegistryInput;
  DeleteMachineryJobRegistryResultUnion: ResolversParentTypes['MachineryJobRegistryNotFound'] | ResolversParentTypes['Ok'];
  DeleteUserInput: DeleteUserInput;
  DeleteUserResultUnion: ResolversParentTypes['ImmutableUser'] | ResolversParentTypes['Ok'] | ResolversParentTypes['UserNotFound'];
  Equipment: ResolversParentTypes['ExternalEquipment'] | ResolversParentTypes['InternalEquipment'];
  EquipmentForExternalBookings: EquipmentForExternalBookings;
  EquipmentForInternalBookings: EquipmentForInternalBookings;
  EquipmentInput: EquipmentInput;
  EquipmentNotFound: EquipmentNotFound;
  EquipmentsByBooking: EquipmentsByBooking;
  EquipmentsByBookingResultUnion: ResolversParentTypes['EquipmentsByBooking'] | ResolversParentTypes['ExternalEquipmentsByBooking'];
  ExternalEquipment: ExternalEquipment;
  ExternalEquipmentsByBooking: ExternalEquipmentsByBooking;
  ExternalMachine: ExternalMachine;
  ExternalOperator: ExternalOperator;
  FindMachineryJobRegistryResultUnion: ResolversParentTypes['FullMachineryJobRegistry'] | ResolversParentTypes['MachineryJobRegistryNotFound'];
  FullBooking: Omit<FullBooking, 'machines'> & { machines: Array<ResolversParentTypes['Machine']> };
  FullMachineryFuelRegistry: Omit<FullMachineryFuelRegistry, 'equipment' | 'operator'> & { equipment: ResolversParentTypes['Equipment'], operator?: Maybe<ResolversParentTypes['Operator']> };
  FullMachineryJobRegistry: Omit<FullMachineryJobRegistry, 'equipment' | 'operator'> & { equipment: ResolversParentTypes['Equipment'], operator: ResolversParentTypes['Operator'] };
  FullMaintenance: FullMaintenance;
  GeneralPayStateEquipments: GeneralPayStateEquipments;
  GeneralPayStateMachinery: Omit<GeneralPayStateMachinery, 'equipment' | 'operator'> & { equipment: ResolversParentTypes['Equipment'], operator: ResolversParentTypes['Operator'] };
  GeneralPayStateReport: GeneralPayStateReport;
  GeneralPayStateTruck: Omit<GeneralPayStateTruck, 'equipment' | 'operator'> & { equipment: ResolversParentTypes['Equipment'], operator: ResolversParentTypes['Operator'] };
  ImmutableUser: ImmutableUser;
  InactiveUser: InactiveUser;
  InternalEquipment: InternalEquipment;
  InternalMachine: InternalMachine;
  InternalOperator: InternalOperator;
  Loads: Loads;
  LoadsInput: LoadsInput;
  Machine: ResolversParentTypes['ExternalMachine'] | ResolversParentTypes['InternalMachine'];
  Machinery: Machinery;
  MachineryFuelRegistryInput: MachineryFuelRegistryInput;
  MachineryFuelRegistryResultUnion: ResolversParentTypes['Ok'];
  MachineryJobRegistryInput: MachineryJobRegistryInput;
  MachineryJobRegistryNotFound: MachineryJobRegistryNotFound;
  MachineryJobRegistryResultUnion: ResolversParentTypes['Ok'];
  MachineryMaintenance: MachineryMaintenance;
  MachineryResume: MachineryResume;
  Mutation: {};
  NewPasswordInput: NewPasswordInput;
  Ok: Ok;
  Operator: ResolversParentTypes['ExternalOperator'] | ResolversParentTypes['InternalOperator'];
  PatentAlreadyExists: PatentAlreadyExists;
  PayStateFilterBuilding: PayStateFilterBuilding;
  PayStateFilterExternalMachine: PayStateFilterExternalMachine;
  PayStateFilterInternalMachine: PayStateFilterInternalMachine;
  PayStateFilterMachine: ResolversParentTypes['PayStateFilterExternalMachine'] | ResolversParentTypes['PayStateFilterInternalMachine'];
  PayStateFilters: Omit<PayStateFilters, 'equipments'> & { equipments: Array<ResolversParentTypes['PayStateFilterMachine']> };
  PayStatesFilter: PayStatesFilter;
  Query: {};
  RecoverCodeInput: RecoverCodeInput;
  RecoverCodeResultUnion: ResolversParentTypes['InactiveUser'] | ResolversParentTypes['Ok'] | ResolversParentTypes['UserNotFound'];
  Role: Role;
  Subscription: {};
  TokenNotFound: TokenNotFound;
  TruckResume: TruckResume;
  UpdateBookingInput: UpdateBookingInput;
  UpdateBookingResultUnion: ResolversParentTypes['BookingNotFound'] | ResolversParentTypes['Ok'];
  UpdateClientInput: UpdateClientInput;
  UpdateClientResultUnion: ResolversParentTypes['ClientNotFound'] | ResolversParentTypes['Ok'];
  UpdateEquipmentInput: UpdateEquipmentInput;
  UpdateEquipmentResultUnion: ResolversParentTypes['CodeAlreadyExists'] | ResolversParentTypes['EquipmentNotFound'] | ResolversParentTypes['Ok'] | ResolversParentTypes['PatentAlreadyExists'];
  UpdateMachineryJobRegistryInput: UpdateMachineryJobRegistryInput;
  UpdateMachineryJobRegistryResultUnion: ResolversParentTypes['MachineryJobRegistryNotFound'] | ResolversParentTypes['Ok'];
  UpdateUserInput: UpdateUserInput;
  UpdateUserResultUnion: ResolversParentTypes['ImmutableUser'] | ResolversParentTypes['Ok'] | ResolversParentTypes['UserNotFound'];
  User: User;
  UserAlreadyExists: UserAlreadyExists;
  UserInput: UserInput;
  UserNotFound: UserNotFound;
  View: View;
  WrongChangePasswordCode: WrongChangePasswordCode;
};

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<Result, Parent, ContextType = any, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = any, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']>;
};

export type ColumnDirectiveResolver<Result, Parent, ContextType = any, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = { };

export type IdDirectiveResolver<Result, Parent, ContextType = any, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = any, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = { };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = any, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String'];
};

export type MapDirectiveResolver<Result, Parent, ContextType = any, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type BillingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Billing'] = ResolversParentTypes['Billing']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  loads?: Resolver<Array<ResolversTypes['Loads']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rut?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Booking'] = ResolversParentTypes['Booking']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  building?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  client?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  constructionManager?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  machines?: Resolver<Array<ResolversTypes['BookingMachinery']>, ParentType, ContextType>;
  receivers?: Resolver<Array<ResolversTypes['BookingReceiver']>, ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['AllowedBookingType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookingMachineryResolvers<ContextType = any, ParentType extends ResolversParentTypes['BookingMachinery'] = ResolversParentTypes['BookingMachinery']> = {
  amountPerDay?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  amountPerHour?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  amountPerTravel?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  equipment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineryType?: Resolver<ResolversTypes['AllowedMachineryType'], ParentType, ContextType>;
  minHours?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  operator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  volume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  workCondition?: Resolver<Maybe<ResolversTypes['AllowedWorkCondition']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookingNotFoundResolvers<ContextType = any, ParentType extends ResolversParentTypes['BookingNotFound'] = ResolversParentTypes['BookingNotFound']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookingReceiverResolvers<ContextType = any, ParentType extends ResolversParentTypes['BookingReceiver'] = ResolversParentTypes['BookingReceiver']> = {
  editable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangePasswordResultUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangePasswordResultUnion'] = ResolversParentTypes['ChangePasswordResultUnion']> = {
  __resolveType: TypeResolveFn<'InactiveUser' | 'Ok' | 'TokenNotFound' | 'UserNotFound' | 'WrongChangePasswordCode', ParentType, ContextType>;
};

export type ClientResolvers<ContextType = any, ParentType extends ResolversParentTypes['Client'] = ResolversParentTypes['Client']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  billing?: Resolver<ResolversTypes['Billing'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paymentCondition?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  receivers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClientNotFoundResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClientNotFound'] = ResolversParentTypes['ClientNotFound']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CodeAlreadyExistsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CodeAlreadyExists'] = ResolversParentTypes['CodeAlreadyExists']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateBookingResultUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateBookingResultUnion'] = ResolversParentTypes['CreateBookingResultUnion']> = {
  __resolveType: TypeResolveFn<'Ok', ParentType, ContextType>;
};

export type CreateClientResultUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateClientResultUnion'] = ResolversParentTypes['CreateClientResultUnion']> = {
  __resolveType: TypeResolveFn<'Ok', ParentType, ContextType>;
};

export type CreateEquipmentResultUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateEquipmentResultUnion'] = ResolversParentTypes['CreateEquipmentResultUnion']> = {
  __resolveType: TypeResolveFn<'CodeAlreadyExists' | 'Ok' | 'PatentAlreadyExists', ParentType, ContextType>;
};

export type CreateUserResultUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateUserResultUnion'] = ResolversParentTypes['CreateUserResultUnion']> = {
  __resolveType: TypeResolveFn<'Ok' | 'UserAlreadyExists', ParentType, ContextType>;
};

export type DailyEquipmentsResumeResolvers<ContextType = any, ParentType extends ResolversParentTypes['DailyEquipmentsResume'] = ResolversParentTypes['DailyEquipmentsResume']> = {
  machinery?: Resolver<Array<ResolversTypes['MachineryResume']>, ParentType, ContextType>;
  trucks?: Resolver<Array<ResolversTypes['TruckResume']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DailyPayStateReportResolvers<ContextType = any, ParentType extends ResolversParentTypes['DailyPayStateReport'] = ResolversParentTypes['DailyPayStateReport']> = {
  amounType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amountPerUse?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  building?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  client?: Resolver<ResolversTypes['Client'], ParentType, ContextType>;
  equipment?: Resolver<ResolversTypes['Equipment'], ParentType, ContextType>;
  hours?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  minHours?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  operator?: Resolver<ResolversTypes['Operator'], ParentType, ContextType>;
  toFacture?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DailyReportResolvers<ContextType = any, ParentType extends ResolversParentTypes['DailyReport'] = ResolversParentTypes['DailyReport']> = {
  extern?: Resolver<ResolversTypes['DailyEquipmentsResume'], ParentType, ContextType>;
  intern?: Resolver<ResolversTypes['DailyEquipmentsResume'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeleteBookingResultUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteBookingResultUnion'] = ResolversParentTypes['DeleteBookingResultUnion']> = {
  __resolveType: TypeResolveFn<'BookingNotFound' | 'Ok', ParentType, ContextType>;
};

export type DeleteClientResultUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteClientResultUnion'] = ResolversParentTypes['DeleteClientResultUnion']> = {
  __resolveType: TypeResolveFn<'ClientNotFound' | 'Ok', ParentType, ContextType>;
};

export type DeleteEquipmentResultUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteEquipmentResultUnion'] = ResolversParentTypes['DeleteEquipmentResultUnion']> = {
  __resolveType: TypeResolveFn<'EquipmentNotFound' | 'Ok', ParentType, ContextType>;
};

export type DeleteMachineryJobRegistryResultUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteMachineryJobRegistryResultUnion'] = ResolversParentTypes['DeleteMachineryJobRegistryResultUnion']> = {
  __resolveType: TypeResolveFn<'MachineryJobRegistryNotFound' | 'Ok', ParentType, ContextType>;
};

export type DeleteUserResultUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteUserResultUnion'] = ResolversParentTypes['DeleteUserResultUnion']> = {
  __resolveType: TypeResolveFn<'ImmutableUser' | 'Ok' | 'UserNotFound', ParentType, ContextType>;
};

export type EquipmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Equipment'] = ResolversParentTypes['Equipment']> = {
  __resolveType: TypeResolveFn<'ExternalEquipment' | 'InternalEquipment', ParentType, ContextType>;
};

export type EquipmentForExternalBookingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['EquipmentForExternalBookings'] = ResolversParentTypes['EquipmentForExternalBookings']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  building?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  client?: Resolver<ResolversTypes['Client'], ParentType, ContextType>;
  minHours?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  operator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workCondition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EquipmentForInternalBookingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['EquipmentForInternalBookings'] = ResolversParentTypes['EquipmentForInternalBookings']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  brand?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  building?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  client?: Resolver<ResolversTypes['Client'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  maintenanceClass?: Resolver<Maybe<ResolversTypes['MaintenanceMachineryClass']>, ParentType, ContextType>;
  model?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  operator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  patent?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['AllowedMachineryType'], ParentType, ContextType>;
  volume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  workCondition?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EquipmentNotFoundResolvers<ContextType = any, ParentType extends ResolversParentTypes['EquipmentNotFound'] = ResolversParentTypes['EquipmentNotFound']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EquipmentsByBookingResolvers<ContextType = any, ParentType extends ResolversParentTypes['EquipmentsByBooking'] = ResolversParentTypes['EquipmentsByBooking']> = {
  equipments?: Resolver<Array<ResolversTypes['EquipmentForInternalBookings']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EquipmentsByBookingResultUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['EquipmentsByBookingResultUnion'] = ResolversParentTypes['EquipmentsByBookingResultUnion']> = {
  __resolveType: TypeResolveFn<'EquipmentsByBooking' | 'ExternalEquipmentsByBooking', ParentType, ContextType>;
};

export type ExternalEquipmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExternalEquipment'] = ResolversParentTypes['ExternalEquipment']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExternalEquipmentsByBookingResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExternalEquipmentsByBooking'] = ResolversParentTypes['ExternalEquipmentsByBooking']> = {
  equipments?: Resolver<Array<ResolversTypes['EquipmentForExternalBookings']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExternalMachineResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExternalMachine'] = ResolversParentTypes['ExternalMachine']> = {
  amountPerDay?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  amountPerHour?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  amountPerTravel?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  equipment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineryType?: Resolver<ResolversTypes['AllowedMachineryType'], ParentType, ContextType>;
  minHours?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  operator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  volume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  workCondition?: Resolver<Maybe<ResolversTypes['AllowedWorkCondition']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExternalOperatorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExternalOperator'] = ResolversParentTypes['ExternalOperator']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FindMachineryJobRegistryResultUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FindMachineryJobRegistryResultUnion'] = ResolversParentTypes['FindMachineryJobRegistryResultUnion']> = {
  __resolveType: TypeResolveFn<'FullMachineryJobRegistry' | 'MachineryJobRegistryNotFound', ParentType, ContextType>;
};

export type FullBookingResolvers<ContextType = any, ParentType extends ResolversParentTypes['FullBooking'] = ResolversParentTypes['FullBooking']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  building?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  client?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  constructionManager?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  machines?: Resolver<Array<ResolversTypes['Machine']>, ParentType, ContextType>;
  receivers?: Resolver<Array<ResolversTypes['BookingReceiver']>, ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['AllowedBookingType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FullMachineryFuelRegistryResolvers<ContextType = any, ParentType extends ResolversParentTypes['FullMachineryFuelRegistry'] = ResolversParentTypes['FullMachineryFuelRegistry']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  equipment?: Resolver<ResolversTypes['Equipment'], ParentType, ContextType>;
  guia?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  hourmeter?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  operator?: Resolver<Maybe<ResolversTypes['Operator']>, ParentType, ContextType>;
  previousRegistry?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FullMachineryJobRegistryResolvers<ContextType = any, ParentType extends ResolversParentTypes['FullMachineryJobRegistry'] = ResolversParentTypes['FullMachineryJobRegistry']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bookingWorkCondition?: Resolver<Maybe<ResolversTypes['AllowedWorkCondition']>, ParentType, ContextType>;
  building?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  client?: Resolver<ResolversTypes['Client'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  endHourmeter?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  equipment?: Resolver<ResolversTypes['Equipment'], ParentType, ContextType>;
  executor?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  folio?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  load?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  machineryType?: Resolver<Maybe<ResolversTypes['AllowedMachineryType']>, ParentType, ContextType>;
  observations?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  operator?: Resolver<ResolversTypes['Operator'], ParentType, ContextType>;
  signature?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startHourmeter?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalHours?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalTravels?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  workCondition?: Resolver<Maybe<ResolversTypes['AllowedWorkCondition']>, ParentType, ContextType>;
  workingDayType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FullMaintenanceResolvers<ContextType = any, ParentType extends ResolversParentTypes['FullMaintenance'] = ResolversParentTypes['FullMaintenance']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  equipment?: Resolver<ResolversTypes['Machinery'], ParentType, ContextType>;
  kmsOfMachinery?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  maintenanceClass?: Resolver<ResolversTypes['MaintenanceMachineryClass'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['MaintenanceStatus']>, ParentType, ContextType>;
  step?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  uid?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeneralPayStateEquipmentsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeneralPayStateEquipments'] = ResolversParentTypes['GeneralPayStateEquipments']> = {
  OTHER?: Resolver<Array<ResolversTypes['GeneralPayStateMachinery']>, ParentType, ContextType>;
  TRUCK?: Resolver<Array<ResolversTypes['GeneralPayStateTruck']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeneralPayStateMachineryResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeneralPayStateMachinery'] = ResolversParentTypes['GeneralPayStateMachinery']> = {
  amountPerUse?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  building?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  client?: Resolver<ResolversTypes['Client'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  equipment?: Resolver<ResolversTypes['Equipment'], ParentType, ContextType>;
  folio?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hours?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  minHours?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  operator?: Resolver<ResolversTypes['Operator'], ParentType, ContextType>;
  toFacture?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeneralPayStateReportResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeneralPayStateReport'] = ResolversParentTypes['GeneralPayStateReport']> = {
  extern?: Resolver<ResolversTypes['GeneralPayStateEquipments'], ParentType, ContextType>;
  intern?: Resolver<ResolversTypes['GeneralPayStateEquipments'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeneralPayStateTruckResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeneralPayStateTruck'] = ResolversParentTypes['GeneralPayStateTruck']> = {
  amountPerUse?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  building?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  client?: Resolver<ResolversTypes['Client'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  equipment?: Resolver<ResolversTypes['Equipment'], ParentType, ContextType>;
  folio?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  load?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  operator?: Resolver<ResolversTypes['Operator'], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalTravels?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  volume?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  workCondition?: Resolver<ResolversTypes['AllowedWorkCondition'], ParentType, ContextType>;
  workingDayType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImmutableUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImmutableUser'] = ResolversParentTypes['ImmutableUser']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rut?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InactiveUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['InactiveUser'] = ResolversParentTypes['InactiveUser']> = {
  rut?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InternalEquipmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['InternalEquipment'] = ResolversParentTypes['InternalEquipment']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  brand?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  maintenanceClass?: Resolver<Maybe<ResolversTypes['MaintenanceMachineryClass']>, ParentType, ContextType>;
  model?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  patent?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['AllowedMachineryType'], ParentType, ContextType>;
  volume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InternalMachineResolvers<ContextType = any, ParentType extends ResolversParentTypes['InternalMachine'] = ResolversParentTypes['InternalMachine']> = {
  amountPerDay?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  amountPerHour?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  amountPerTravel?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  equipment?: Resolver<ResolversTypes['Machinery'], ParentType, ContextType>;
  machineryType?: Resolver<ResolversTypes['AllowedMachineryType'], ParentType, ContextType>;
  minHours?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  operator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  volume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  workCondition?: Resolver<Maybe<ResolversTypes['AllowedWorkCondition']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InternalOperatorResolvers<ContextType = any, ParentType extends ResolversParentTypes['InternalOperator'] = ResolversParentTypes['InternalOperator']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isSystemAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rut?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  signature?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoadsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Loads'] = ResolversParentTypes['Loads']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineResolvers<ContextType = any, ParentType extends ResolversParentTypes['Machine'] = ResolversParentTypes['Machine']> = {
  __resolveType: TypeResolveFn<'ExternalMachine' | 'InternalMachine', ParentType, ContextType>;
};

export type MachineryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Machinery'] = ResolversParentTypes['Machinery']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  brand?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  maintenanceClass?: Resolver<Maybe<ResolversTypes['MaintenanceMachineryClass']>, ParentType, ContextType>;
  model?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  patent?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['AllowedMachineryType'], ParentType, ContextType>;
  volume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineryFuelRegistryResultUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MachineryFuelRegistryResultUnion'] = ResolversParentTypes['MachineryFuelRegistryResultUnion']> = {
  __resolveType: TypeResolveFn<'Ok', ParentType, ContextType>;
};

export type MachineryJobRegistryNotFoundResolvers<ContextType = any, ParentType extends ResolversParentTypes['MachineryJobRegistryNotFound'] = ResolversParentTypes['MachineryJobRegistryNotFound']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineryJobRegistryResultUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MachineryJobRegistryResultUnion'] = ResolversParentTypes['MachineryJobRegistryResultUnion']> = {
  __resolveType: TypeResolveFn<'Ok', ParentType, ContextType>;
};

export type MachineryMaintenanceResolvers<ContextType = any, ParentType extends ResolversParentTypes['MachineryMaintenance'] = ResolversParentTypes['MachineryMaintenance']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  equipment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  kmsOfMachinery?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  maintenanceClass?: Resolver<ResolversTypes['MaintenanceMachineryClass'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['MaintenanceStatus']>, ParentType, ContextType>;
  step?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  uid?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineryResumeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MachineryResume'] = ResolversParentTypes['MachineryResume']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  building?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endHourmeter?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  equipment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  observations?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  operator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startHourmeter?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalHours?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  changeMaintenanceStatus?: Resolver<ResolversTypes['MachineryMaintenance'], ParentType, ContextType, RequireFields<MutationChangeMaintenanceStatusArgs, 'id'>>;
  changePasswordWithAuthCode?: Resolver<ResolversTypes['ChangePasswordResultUnion'], ParentType, ContextType, RequireFields<MutationChangePasswordWithAuthCodeArgs, 'form'>>;
  createBooking?: Resolver<ResolversTypes['CreateBookingResultUnion'], ParentType, ContextType, RequireFields<MutationCreateBookingArgs, 'form'>>;
  createClient?: Resolver<ResolversTypes['CreateClientResultUnion'], ParentType, ContextType, RequireFields<MutationCreateClientArgs, 'form'>>;
  createEquipment?: Resolver<ResolversTypes['CreateEquipmentResultUnion'], ParentType, ContextType, RequireFields<MutationCreateEquipmentArgs, 'form'>>;
  createMachineryFuelRegistry?: Resolver<ResolversTypes['MachineryFuelRegistryResultUnion'], ParentType, ContextType, RequireFields<MutationCreateMachineryFuelRegistryArgs, 'form'>>;
  createMachineryJobRegistry?: Resolver<ResolversTypes['MachineryJobRegistryResultUnion'], ParentType, ContextType, RequireFields<MutationCreateMachineryJobRegistryArgs, 'form'>>;
  createUser?: Resolver<ResolversTypes['CreateUserResultUnion'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'form'>>;
  deleteBooking?: Resolver<ResolversTypes['DeleteBookingResultUnion'], ParentType, ContextType, RequireFields<MutationDeleteBookingArgs, 'form'>>;
  deleteClient?: Resolver<ResolversTypes['DeleteClientResultUnion'], ParentType, ContextType, RequireFields<MutationDeleteClientArgs, 'form'>>;
  deleteEquipment?: Resolver<ResolversTypes['DeleteEquipmentResultUnion'], ParentType, ContextType, RequireFields<MutationDeleteEquipmentArgs, 'form'>>;
  deleteMachineryJobRegistry?: Resolver<ResolversTypes['DeleteMachineryJobRegistryResultUnion'], ParentType, ContextType, RequireFields<MutationDeleteMachineryJobRegistryArgs, 'form'>>;
  deleteUser?: Resolver<ResolversTypes['DeleteUserResultUnion'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'form'>>;
  updateBooking?: Resolver<ResolversTypes['UpdateBookingResultUnion'], ParentType, ContextType, RequireFields<MutationUpdateBookingArgs, 'form'>>;
  updateClient?: Resolver<ResolversTypes['UpdateClientResultUnion'], ParentType, ContextType, RequireFields<MutationUpdateClientArgs, 'form'>>;
  updateEquipment?: Resolver<ResolversTypes['UpdateEquipmentResultUnion'], ParentType, ContextType, RequireFields<MutationUpdateEquipmentArgs, 'form'>>;
  updateMachineryJobRegistry?: Resolver<ResolversTypes['UpdateMachineryJobRegistryResultUnion'], ParentType, ContextType, RequireFields<MutationUpdateMachineryJobRegistryArgs, 'form'>>;
  updateUser?: Resolver<ResolversTypes['UpdateUserResultUnion'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'form'>>;
};

export type OkResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ok'] = ResolversParentTypes['Ok']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OperatorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Operator'] = ResolversParentTypes['Operator']> = {
  __resolveType: TypeResolveFn<'ExternalOperator' | 'InternalOperator', ParentType, ContextType>;
};

export type PatentAlreadyExistsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PatentAlreadyExists'] = ResolversParentTypes['PatentAlreadyExists']> = {
  patent?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PayStateFilterBuildingResolvers<ContextType = any, ParentType extends ResolversParentTypes['PayStateFilterBuilding'] = ResolversParentTypes['PayStateFilterBuilding']> = {
  clientId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PayStateFilterExternalMachineResolvers<ContextType = any, ParentType extends ResolversParentTypes['PayStateFilterExternalMachine'] = ResolversParentTypes['PayStateFilterExternalMachine']> = {
  fromBuilding?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  fromClient?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PayStateFilterInternalMachineResolvers<ContextType = any, ParentType extends ResolversParentTypes['PayStateFilterInternalMachine'] = ResolversParentTypes['PayStateFilterInternalMachine']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  brand?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fromBuilding?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  fromClient?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  maintenanceClass?: Resolver<Maybe<ResolversTypes['MaintenanceMachineryClass']>, ParentType, ContextType>;
  model?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  patent?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['AllowedMachineryType'], ParentType, ContextType>;
  volume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PayStateFilterMachineResolvers<ContextType = any, ParentType extends ResolversParentTypes['PayStateFilterMachine'] = ResolversParentTypes['PayStateFilterMachine']> = {
  __resolveType: TypeResolveFn<'PayStateFilterExternalMachine' | 'PayStateFilterInternalMachine', ParentType, ContextType>;
};

export type PayStateFiltersResolvers<ContextType = any, ParentType extends ResolversParentTypes['PayStateFilters'] = ResolversParentTypes['PayStateFilters']> = {
  buildings?: Resolver<Array<ResolversTypes['PayStateFilterBuilding']>, ParentType, ContextType>;
  clients?: Resolver<Array<ResolversTypes['Client']>, ParentType, ContextType>;
  equipments?: Resolver<Array<ResolversTypes['PayStateFilterMachine']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllBookings?: Resolver<Array<ResolversTypes['Booking']>, ParentType, ContextType>;
  getAllClients?: Resolver<Array<ResolversTypes['Client']>, ParentType, ContextType>;
  getAllEquipments?: Resolver<Array<ResolversTypes['Machinery']>, ParentType, ContextType>;
  getAllEquipmentsByBuilding?: Resolver<ResolversTypes['EquipmentsByBookingResultUnion'], ParentType, ContextType, RequireFields<QueryGetAllEquipmentsByBuildingArgs, 'date' | 'user'>>;
  getAllFuelRegistries?: Resolver<Array<ResolversTypes['FullMachineryFuelRegistry']>, ParentType, ContextType, RequireFields<QueryGetAllFuelRegistriesArgs, 'endDate' | 'startDate'>>;
  getAllLastMaintenance?: Resolver<Array<ResolversTypes['FullMaintenance']>, ParentType, ContextType>;
  getAllMachineryJobRegistry?: Resolver<Array<ResolversTypes['FullMachineryJobRegistry']>, ParentType, ContextType>;
  getAllMachineryJobRegistryByDate?: Resolver<Array<ResolversTypes['FullMachineryJobRegistry']>, ParentType, ContextType, RequireFields<QueryGetAllMachineryJobRegistryByDateArgs, 'date'>>;
  getAllMachineryJobRegistryByUserAndDate?: Resolver<Array<ResolversTypes['FullMachineryJobRegistry']>, ParentType, ContextType, RequireFields<QueryGetAllMachineryJobRegistryByUserAndDateArgs, 'endDate' | 'startDate' | 'user'>>;
  getAllPreviousFuelRegistries?: Resolver<Array<ResolversTypes['FullMachineryFuelRegistry']>, ParentType, ContextType, RequireFields<QueryGetAllPreviousFuelRegistriesArgs, 'equipments'>>;
  getAllRoles?: Resolver<Array<ResolversTypes['Role']>, ParentType, ContextType>;
  getAllUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  getAllUsersWithRoleName?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetAllUsersWithRoleNameArgs, 'role'>>;
  getBookingsByDate?: Resolver<Array<ResolversTypes['FullBooking']>, ParentType, ContextType, RequireFields<QueryGetBookingsByDateArgs, 'date'>>;
  getBookingsForPayStates?: Resolver<ResolversTypes['PayStateFilters'], ParentType, ContextType, RequireFields<QueryGetBookingsForPayStatesArgs, 'endDate' | 'startDate'>>;
  getBuildingsByClientAndDate?: Resolver<Array<ResolversTypes['Booking']>, ParentType, ContextType, RequireFields<QueryGetBuildingsByClientAndDateArgs, 'client' | 'date' | 'equipment'>>;
  getClient?: Resolver<ResolversTypes['Client'], ParentType, ContextType, RequireFields<QueryGetClientArgs, 'client'>>;
  getDailyPayState?: Resolver<Array<ResolversTypes['DailyPayStateReport']>, ParentType, ContextType, RequireFields<QueryGetDailyPayStateArgs, 'date'>>;
  getDailyResume?: Resolver<ResolversTypes['DailyReport'], ParentType, ContextType, RequireFields<QueryGetDailyResumeArgs, 'date'>>;
  getEquipmentPayState?: Resolver<ResolversTypes['GeneralPayStateReport'], ParentType, ContextType, RequireFields<QueryGetEquipmentPayStateArgs, 'filters'>>;
  getMaintenancePage?: Resolver<Array<ResolversTypes['FullMaintenance']>, ParentType, ContextType, RequireFields<QueryGetMaintenancePageArgs, 'equipment' | 'lastUid'>>;
  getPreviousMachineryJobRegistry?: Resolver<ResolversTypes['FindMachineryJobRegistryResultUnion'], ParentType, ContextType, RequireFields<QueryGetPreviousMachineryJobRegistryArgs, 'date' | 'equipment' | 'user'>>;
  getRecoverCode?: Resolver<ResolversTypes['RecoverCodeResultUnion'], ParentType, ContextType, RequireFields<QueryGetRecoverCodeArgs, 'form'>>;
  getUserNextJob?: Resolver<Array<ResolversTypes['Booking']>, ParentType, ContextType, RequireFields<QueryGetUserNextJobArgs, 'date' | 'user'>>;
};

export type RecoverCodeResultUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['RecoverCodeResultUnion'] = ResolversParentTypes['RecoverCodeResultUnion']> = {
  __resolveType: TypeResolveFn<'InactiveUser' | 'Ok' | 'UserNotFound', ParentType, ContextType>;
};

export type RoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  initialView?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  maintenanceAdded?: SubscriptionResolver<ResolversTypes['FullMaintenance'], "maintenanceAdded", ParentType, ContextType>;
  maintenanceStatusUpdated?: SubscriptionResolver<ResolversTypes['MachineryMaintenance'], "maintenanceStatusUpdated", ParentType, ContextType>;
};

export type TokenNotFoundResolvers<ContextType = any, ParentType extends ResolversParentTypes['TokenNotFound'] = ResolversParentTypes['TokenNotFound']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TruckResumeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TruckResume'] = ResolversParentTypes['TruckResume']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  building?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  equipment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  load?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  observations?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  operator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalTravels?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  volume?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  workingDayType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateBookingResultUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateBookingResultUnion'] = ResolversParentTypes['UpdateBookingResultUnion']> = {
  __resolveType: TypeResolveFn<'BookingNotFound' | 'Ok', ParentType, ContextType>;
};

export type UpdateClientResultUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateClientResultUnion'] = ResolversParentTypes['UpdateClientResultUnion']> = {
  __resolveType: TypeResolveFn<'ClientNotFound' | 'Ok', ParentType, ContextType>;
};

export type UpdateEquipmentResultUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateEquipmentResultUnion'] = ResolversParentTypes['UpdateEquipmentResultUnion']> = {
  __resolveType: TypeResolveFn<'CodeAlreadyExists' | 'EquipmentNotFound' | 'Ok' | 'PatentAlreadyExists', ParentType, ContextType>;
};

export type UpdateMachineryJobRegistryResultUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateMachineryJobRegistryResultUnion'] = ResolversParentTypes['UpdateMachineryJobRegistryResultUnion']> = {
  __resolveType: TypeResolveFn<'MachineryJobRegistryNotFound' | 'Ok', ParentType, ContextType>;
};

export type UpdateUserResultUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateUserResultUnion'] = ResolversParentTypes['UpdateUserResultUnion']> = {
  __resolveType: TypeResolveFn<'ImmutableUser' | 'Ok' | 'UserNotFound', ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isSystemAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rut?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  signature?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAlreadyExistsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAlreadyExists'] = ResolversParentTypes['UserAlreadyExists']> = {
  rut?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserNotFoundResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserNotFound'] = ResolversParentTypes['UserNotFound']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ViewResolvers<ContextType = any, ParentType extends ResolversParentTypes['View'] = ResolversParentTypes['View']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  children?: Resolver<Array<ResolversTypes['View']>, ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WrongChangePasswordCodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['WrongChangePasswordCode'] = ResolversParentTypes['WrongChangePasswordCode']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Billing?: BillingResolvers<ContextType>;
  Booking?: BookingResolvers<ContextType>;
  BookingMachinery?: BookingMachineryResolvers<ContextType>;
  BookingNotFound?: BookingNotFoundResolvers<ContextType>;
  BookingReceiver?: BookingReceiverResolvers<ContextType>;
  ChangePasswordResultUnion?: ChangePasswordResultUnionResolvers<ContextType>;
  Client?: ClientResolvers<ContextType>;
  ClientNotFound?: ClientNotFoundResolvers<ContextType>;
  CodeAlreadyExists?: CodeAlreadyExistsResolvers<ContextType>;
  CreateBookingResultUnion?: CreateBookingResultUnionResolvers<ContextType>;
  CreateClientResultUnion?: CreateClientResultUnionResolvers<ContextType>;
  CreateEquipmentResultUnion?: CreateEquipmentResultUnionResolvers<ContextType>;
  CreateUserResultUnion?: CreateUserResultUnionResolvers<ContextType>;
  DailyEquipmentsResume?: DailyEquipmentsResumeResolvers<ContextType>;
  DailyPayStateReport?: DailyPayStateReportResolvers<ContextType>;
  DailyReport?: DailyReportResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DeleteBookingResultUnion?: DeleteBookingResultUnionResolvers<ContextType>;
  DeleteClientResultUnion?: DeleteClientResultUnionResolvers<ContextType>;
  DeleteEquipmentResultUnion?: DeleteEquipmentResultUnionResolvers<ContextType>;
  DeleteMachineryJobRegistryResultUnion?: DeleteMachineryJobRegistryResultUnionResolvers<ContextType>;
  DeleteUserResultUnion?: DeleteUserResultUnionResolvers<ContextType>;
  Equipment?: EquipmentResolvers<ContextType>;
  EquipmentForExternalBookings?: EquipmentForExternalBookingsResolvers<ContextType>;
  EquipmentForInternalBookings?: EquipmentForInternalBookingsResolvers<ContextType>;
  EquipmentNotFound?: EquipmentNotFoundResolvers<ContextType>;
  EquipmentsByBooking?: EquipmentsByBookingResolvers<ContextType>;
  EquipmentsByBookingResultUnion?: EquipmentsByBookingResultUnionResolvers<ContextType>;
  ExternalEquipment?: ExternalEquipmentResolvers<ContextType>;
  ExternalEquipmentsByBooking?: ExternalEquipmentsByBookingResolvers<ContextType>;
  ExternalMachine?: ExternalMachineResolvers<ContextType>;
  ExternalOperator?: ExternalOperatorResolvers<ContextType>;
  FindMachineryJobRegistryResultUnion?: FindMachineryJobRegistryResultUnionResolvers<ContextType>;
  FullBooking?: FullBookingResolvers<ContextType>;
  FullMachineryFuelRegistry?: FullMachineryFuelRegistryResolvers<ContextType>;
  FullMachineryJobRegistry?: FullMachineryJobRegistryResolvers<ContextType>;
  FullMaintenance?: FullMaintenanceResolvers<ContextType>;
  GeneralPayStateEquipments?: GeneralPayStateEquipmentsResolvers<ContextType>;
  GeneralPayStateMachinery?: GeneralPayStateMachineryResolvers<ContextType>;
  GeneralPayStateReport?: GeneralPayStateReportResolvers<ContextType>;
  GeneralPayStateTruck?: GeneralPayStateTruckResolvers<ContextType>;
  ImmutableUser?: ImmutableUserResolvers<ContextType>;
  InactiveUser?: InactiveUserResolvers<ContextType>;
  InternalEquipment?: InternalEquipmentResolvers<ContextType>;
  InternalMachine?: InternalMachineResolvers<ContextType>;
  InternalOperator?: InternalOperatorResolvers<ContextType>;
  Loads?: LoadsResolvers<ContextType>;
  Machine?: MachineResolvers<ContextType>;
  Machinery?: MachineryResolvers<ContextType>;
  MachineryFuelRegistryResultUnion?: MachineryFuelRegistryResultUnionResolvers<ContextType>;
  MachineryJobRegistryNotFound?: MachineryJobRegistryNotFoundResolvers<ContextType>;
  MachineryJobRegistryResultUnion?: MachineryJobRegistryResultUnionResolvers<ContextType>;
  MachineryMaintenance?: MachineryMaintenanceResolvers<ContextType>;
  MachineryResume?: MachineryResumeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Ok?: OkResolvers<ContextType>;
  Operator?: OperatorResolvers<ContextType>;
  PatentAlreadyExists?: PatentAlreadyExistsResolvers<ContextType>;
  PayStateFilterBuilding?: PayStateFilterBuildingResolvers<ContextType>;
  PayStateFilterExternalMachine?: PayStateFilterExternalMachineResolvers<ContextType>;
  PayStateFilterInternalMachine?: PayStateFilterInternalMachineResolvers<ContextType>;
  PayStateFilterMachine?: PayStateFilterMachineResolvers<ContextType>;
  PayStateFilters?: PayStateFiltersResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RecoverCodeResultUnion?: RecoverCodeResultUnionResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  TokenNotFound?: TokenNotFoundResolvers<ContextType>;
  TruckResume?: TruckResumeResolvers<ContextType>;
  UpdateBookingResultUnion?: UpdateBookingResultUnionResolvers<ContextType>;
  UpdateClientResultUnion?: UpdateClientResultUnionResolvers<ContextType>;
  UpdateEquipmentResultUnion?: UpdateEquipmentResultUnionResolvers<ContextType>;
  UpdateMachineryJobRegistryResultUnion?: UpdateMachineryJobRegistryResultUnionResolvers<ContextType>;
  UpdateUserResultUnion?: UpdateUserResultUnionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserAlreadyExists?: UserAlreadyExistsResolvers<ContextType>;
  UserNotFound?: UserNotFoundResolvers<ContextType>;
  View?: ViewResolvers<ContextType>;
  WrongChangePasswordCode?: WrongChangePasswordCodeResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};

import { ObjectId } from 'mongodb';