import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  amountPerHour?: Maybe<Scalars['Float']>;
  equipment: Scalars['String'];
  machineryType: AllowedMachineryType;
  minHours?: Maybe<Scalars['Float']>;
  operator: Scalars['String'];
  workCondition?: Maybe<AllowedWorkCondition>;
};

export type BookingMachineryInput = {
  amountPerHour?: InputMaybe<Scalars['Float']>;
  equipment: Scalars['String'];
  machineryType: AllowedMachineryType;
  minHours?: InputMaybe<Scalars['Float']>;
  operator: Scalars['String'];
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

export type DeleteUserInput = {
  _id: Scalars['String'];
};

export type DeleteUserResultUnion = ImmutableUser | Ok | UserNotFound;

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
  equipments: Array<Machinery>;
};

export type EquipmentsByBookingResultUnion = EquipmentsByBooking | ExternalEquipmentsByBooking;

export type ExternalEquipmentsByBooking = {
  __typename?: 'ExternalEquipmentsByBooking';
  equipments: Array<Scalars['String']>;
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

export type Loads = {
  __typename?: 'Loads';
  amount: Scalars['Float'];
  type: Scalars['String'];
};

export type LoadsInput = {
  amount: Scalars['Float'];
  type: Scalars['String'];
};

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

export enum MaintenanceMachineryClass {
  ClassA = 'CLASS_A',
  ClassB = 'CLASS_B'
}

export type Mutation = {
  __typename?: 'Mutation';
  changePasswordWithAuthCode: ChangePasswordResultUnion;
  createBooking: CreateBookingResultUnion;
  createClient: CreateClientResultUnion;
  createEquipment: CreateEquipmentResultUnion;
  createUser: CreateUserResultUnion;
  deleteBooking: DeleteBookingResultUnion;
  deleteClient: DeleteClientResultUnion;
  deleteEquipment: DeleteEquipmentResultUnion;
  deleteUser: DeleteUserResultUnion;
  updateBooking: UpdateBookingResultUnion;
  updateClient: UpdateClientResultUnion;
  updateEquipment: UpdateEquipmentResultUnion;
  updateUser: UpdateUserResultUnion;
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

export type PatentAlreadyExists = {
  __typename?: 'PatentAlreadyExists';
  patent: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAllBookings: Array<Booking>;
  getAllClients: Array<Client>;
  getAllEquipments: Array<Machinery>;
  getAllEquipmentsByBuilding: EquipmentsByBookingResultUnion;
  getAllRoles: Array<Role>;
  getAllUsers: Array<User>;
  getAllUsersWithRoleName: Array<User>;
  getBuildingsByClientAndDate: Array<Booking>;
  getLoadsByClient: Client;
  getRecoverCode: RecoverCodeResultUnion;
};


export type QueryGetAllEquipmentsByBuildingArgs = {
  date: Scalars['String'];
  user: Scalars['String'];
};


export type QueryGetAllUsersWithRoleNameArgs = {
  role: Scalars['String'];
};


export type QueryGetBuildingsByClientAndDateArgs = {
  client: Scalars['String'];
  date: Scalars['String'];
  machineryType: Scalars['String'];
};


export type QueryGetLoadsByClientArgs = {
  client: Scalars['String'];
};


export type QueryGetRecoverCodeArgs = {
  form: RecoverCodeInput;
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

export type TokenNotFound = {
  __typename?: 'TokenNotFound';
  message: Scalars['String'];
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
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DeleteBookingInput: DeleteBookingInput;
  DeleteBookingResultUnion: ResolversTypes['BookingNotFound'] | ResolversTypes['Ok'];
  DeleteClientInput: DeleteClientInput;
  DeleteClientResultUnion: ResolversTypes['ClientNotFound'] | ResolversTypes['Ok'];
  DeleteEquipmentInput: DeleteEquipmentInput;
  DeleteEquipmentResultUnion: ResolversTypes['EquipmentNotFound'] | ResolversTypes['Ok'];
  DeleteUserInput: DeleteUserInput;
  DeleteUserResultUnion: ResolversTypes['ImmutableUser'] | ResolversTypes['Ok'] | ResolversTypes['UserNotFound'];
  EquipmentInput: EquipmentInput;
  EquipmentNotFound: ResolverTypeWrapper<EquipmentNotFound>;
  EquipmentsByBooking: ResolverTypeWrapper<EquipmentsByBooking>;
  EquipmentsByBookingResultUnion: ResolversTypes['EquipmentsByBooking'] | ResolversTypes['ExternalEquipmentsByBooking'];
  ExternalEquipmentsByBooking: ResolverTypeWrapper<ExternalEquipmentsByBooking>;
  ImmutableUser: ResolverTypeWrapper<ImmutableUser>;
  InactiveUser: ResolverTypeWrapper<InactiveUser>;
  Loads: ResolverTypeWrapper<Loads>;
  LoadsInput: LoadsInput;
  Machinery: ResolverTypeWrapper<Machinery>;
  MaintenanceMachineryClass: MaintenanceMachineryClass;
  Mutation: ResolverTypeWrapper<{}>;
  NewPasswordInput: NewPasswordInput;
  Ok: ResolverTypeWrapper<Ok>;
  PatentAlreadyExists: ResolverTypeWrapper<PatentAlreadyExists>;
  Query: ResolverTypeWrapper<{}>;
  RecoverCodeInput: RecoverCodeInput;
  RecoverCodeResultUnion: ResolversTypes['InactiveUser'] | ResolversTypes['Ok'] | ResolversTypes['UserNotFound'];
  Role: ResolverTypeWrapper<Role>;
  TokenNotFound: ResolverTypeWrapper<TokenNotFound>;
  UpdateBookingInput: UpdateBookingInput;
  UpdateBookingResultUnion: ResolversTypes['BookingNotFound'] | ResolversTypes['Ok'];
  UpdateClientInput: UpdateClientInput;
  UpdateClientResultUnion: ResolversTypes['ClientNotFound'] | ResolversTypes['Ok'];
  UpdateEquipmentInput: UpdateEquipmentInput;
  UpdateEquipmentResultUnion: ResolversTypes['CodeAlreadyExists'] | ResolversTypes['EquipmentNotFound'] | ResolversTypes['Ok'] | ResolversTypes['PatentAlreadyExists'];
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
  DateTime: Scalars['DateTime'];
  DeleteBookingInput: DeleteBookingInput;
  DeleteBookingResultUnion: ResolversParentTypes['BookingNotFound'] | ResolversParentTypes['Ok'];
  DeleteClientInput: DeleteClientInput;
  DeleteClientResultUnion: ResolversParentTypes['ClientNotFound'] | ResolversParentTypes['Ok'];
  DeleteEquipmentInput: DeleteEquipmentInput;
  DeleteEquipmentResultUnion: ResolversParentTypes['EquipmentNotFound'] | ResolversParentTypes['Ok'];
  DeleteUserInput: DeleteUserInput;
  DeleteUserResultUnion: ResolversParentTypes['ImmutableUser'] | ResolversParentTypes['Ok'] | ResolversParentTypes['UserNotFound'];
  EquipmentInput: EquipmentInput;
  EquipmentNotFound: EquipmentNotFound;
  EquipmentsByBooking: EquipmentsByBooking;
  EquipmentsByBookingResultUnion: ResolversParentTypes['EquipmentsByBooking'] | ResolversParentTypes['ExternalEquipmentsByBooking'];
  ExternalEquipmentsByBooking: ExternalEquipmentsByBooking;
  ImmutableUser: ImmutableUser;
  InactiveUser: InactiveUser;
  Loads: Loads;
  LoadsInput: LoadsInput;
  Machinery: Machinery;
  Mutation: {};
  NewPasswordInput: NewPasswordInput;
  Ok: Ok;
  PatentAlreadyExists: PatentAlreadyExists;
  Query: {};
  RecoverCodeInput: RecoverCodeInput;
  RecoverCodeResultUnion: ResolversParentTypes['InactiveUser'] | ResolversParentTypes['Ok'] | ResolversParentTypes['UserNotFound'];
  Role: Role;
  TokenNotFound: TokenNotFound;
  UpdateBookingInput: UpdateBookingInput;
  UpdateBookingResultUnion: ResolversParentTypes['BookingNotFound'] | ResolversParentTypes['Ok'];
  UpdateClientInput: UpdateClientInput;
  UpdateClientResultUnion: ResolversParentTypes['ClientNotFound'] | ResolversParentTypes['Ok'];
  UpdateEquipmentInput: UpdateEquipmentInput;
  UpdateEquipmentResultUnion: ResolversParentTypes['CodeAlreadyExists'] | ResolversParentTypes['EquipmentNotFound'] | ResolversParentTypes['Ok'] | ResolversParentTypes['PatentAlreadyExists'];
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
  amountPerHour?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  equipment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineryType?: Resolver<ResolversTypes['AllowedMachineryType'], ParentType, ContextType>;
  minHours?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  operator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export type DeleteUserResultUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteUserResultUnion'] = ResolversParentTypes['DeleteUserResultUnion']> = {
  __resolveType: TypeResolveFn<'ImmutableUser' | 'Ok' | 'UserNotFound', ParentType, ContextType>;
};

export type EquipmentNotFoundResolvers<ContextType = any, ParentType extends ResolversParentTypes['EquipmentNotFound'] = ResolversParentTypes['EquipmentNotFound']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EquipmentsByBookingResolvers<ContextType = any, ParentType extends ResolversParentTypes['EquipmentsByBooking'] = ResolversParentTypes['EquipmentsByBooking']> = {
  equipments?: Resolver<Array<ResolversTypes['Machinery']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EquipmentsByBookingResultUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['EquipmentsByBookingResultUnion'] = ResolversParentTypes['EquipmentsByBookingResultUnion']> = {
  __resolveType: TypeResolveFn<'EquipmentsByBooking' | 'ExternalEquipmentsByBooking', ParentType, ContextType>;
};

export type ExternalEquipmentsByBookingResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExternalEquipmentsByBooking'] = ResolversParentTypes['ExternalEquipmentsByBooking']> = {
  equipments?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
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

export type LoadsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Loads'] = ResolversParentTypes['Loads']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  changePasswordWithAuthCode?: Resolver<ResolversTypes['ChangePasswordResultUnion'], ParentType, ContextType, RequireFields<MutationChangePasswordWithAuthCodeArgs, 'form'>>;
  createBooking?: Resolver<ResolversTypes['CreateBookingResultUnion'], ParentType, ContextType, RequireFields<MutationCreateBookingArgs, 'form'>>;
  createClient?: Resolver<ResolversTypes['CreateClientResultUnion'], ParentType, ContextType, RequireFields<MutationCreateClientArgs, 'form'>>;
  createEquipment?: Resolver<ResolversTypes['CreateEquipmentResultUnion'], ParentType, ContextType, RequireFields<MutationCreateEquipmentArgs, 'form'>>;
  createUser?: Resolver<ResolversTypes['CreateUserResultUnion'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'form'>>;
  deleteBooking?: Resolver<ResolversTypes['DeleteBookingResultUnion'], ParentType, ContextType, RequireFields<MutationDeleteBookingArgs, 'form'>>;
  deleteClient?: Resolver<ResolversTypes['DeleteClientResultUnion'], ParentType, ContextType, RequireFields<MutationDeleteClientArgs, 'form'>>;
  deleteEquipment?: Resolver<ResolversTypes['DeleteEquipmentResultUnion'], ParentType, ContextType, RequireFields<MutationDeleteEquipmentArgs, 'form'>>;
  deleteUser?: Resolver<ResolversTypes['DeleteUserResultUnion'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'form'>>;
  updateBooking?: Resolver<ResolversTypes['UpdateBookingResultUnion'], ParentType, ContextType, RequireFields<MutationUpdateBookingArgs, 'form'>>;
  updateClient?: Resolver<ResolversTypes['UpdateClientResultUnion'], ParentType, ContextType, RequireFields<MutationUpdateClientArgs, 'form'>>;
  updateEquipment?: Resolver<ResolversTypes['UpdateEquipmentResultUnion'], ParentType, ContextType, RequireFields<MutationUpdateEquipmentArgs, 'form'>>;
  updateUser?: Resolver<ResolversTypes['UpdateUserResultUnion'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'form'>>;
};

export type OkResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ok'] = ResolversParentTypes['Ok']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PatentAlreadyExistsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PatentAlreadyExists'] = ResolversParentTypes['PatentAlreadyExists']> = {
  patent?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllBookings?: Resolver<Array<ResolversTypes['Booking']>, ParentType, ContextType>;
  getAllClients?: Resolver<Array<ResolversTypes['Client']>, ParentType, ContextType>;
  getAllEquipments?: Resolver<Array<ResolversTypes['Machinery']>, ParentType, ContextType>;
  getAllEquipmentsByBuilding?: Resolver<ResolversTypes['EquipmentsByBookingResultUnion'], ParentType, ContextType, RequireFields<QueryGetAllEquipmentsByBuildingArgs, 'date' | 'user'>>;
  getAllRoles?: Resolver<Array<ResolversTypes['Role']>, ParentType, ContextType>;
  getAllUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  getAllUsersWithRoleName?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetAllUsersWithRoleNameArgs, 'role'>>;
  getBuildingsByClientAndDate?: Resolver<Array<ResolversTypes['Booking']>, ParentType, ContextType, RequireFields<QueryGetBuildingsByClientAndDateArgs, 'client' | 'date' | 'machineryType'>>;
  getLoadsByClient?: Resolver<ResolversTypes['Client'], ParentType, ContextType, RequireFields<QueryGetLoadsByClientArgs, 'client'>>;
  getRecoverCode?: Resolver<ResolversTypes['RecoverCodeResultUnion'], ParentType, ContextType, RequireFields<QueryGetRecoverCodeArgs, 'form'>>;
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

export type TokenNotFoundResolvers<ContextType = any, ParentType extends ResolversParentTypes['TokenNotFound'] = ResolversParentTypes['TokenNotFound']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  DateTime?: GraphQLScalarType;
  DeleteBookingResultUnion?: DeleteBookingResultUnionResolvers<ContextType>;
  DeleteClientResultUnion?: DeleteClientResultUnionResolvers<ContextType>;
  DeleteEquipmentResultUnion?: DeleteEquipmentResultUnionResolvers<ContextType>;
  DeleteUserResultUnion?: DeleteUserResultUnionResolvers<ContextType>;
  EquipmentNotFound?: EquipmentNotFoundResolvers<ContextType>;
  EquipmentsByBooking?: EquipmentsByBookingResolvers<ContextType>;
  EquipmentsByBookingResultUnion?: EquipmentsByBookingResultUnionResolvers<ContextType>;
  ExternalEquipmentsByBooking?: ExternalEquipmentsByBookingResolvers<ContextType>;
  ImmutableUser?: ImmutableUserResolvers<ContextType>;
  InactiveUser?: InactiveUserResolvers<ContextType>;
  Loads?: LoadsResolvers<ContextType>;
  Machinery?: MachineryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Ok?: OkResolvers<ContextType>;
  PatentAlreadyExists?: PatentAlreadyExistsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RecoverCodeResultUnion?: RecoverCodeResultUnionResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  TokenNotFound?: TokenNotFoundResolvers<ContextType>;
  UpdateBookingResultUnion?: UpdateBookingResultUnionResolvers<ContextType>;
  UpdateClientResultUnion?: UpdateClientResultUnionResolvers<ContextType>;
  UpdateEquipmentResultUnion?: UpdateEquipmentResultUnionResolvers<ContextType>;
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