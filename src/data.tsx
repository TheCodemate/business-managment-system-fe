import { ReactElement } from "react";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

export const icons: Record<string, ReactElement | null> = {
  add: <PersonAddAlt1Icon className="text-fontDetail" />,
  none: null,
};

export const requests = [
  {
    requestId: "8357398373",
    createdAt: "2024-04-01T14:26:00",
    requestTypes: ["price" as const],
    productCode: "PC001",
    collectionName: "Classic Collection",
    width: "100",
    height: "50",
    thickness: "5mm",
    finish: "Glossy",
    producer: "ABC Inc",
    color: "White",
    productCategory: "ceramicTiles" as const,
    quantity: "100",
    additionalInfo: "Special discount for bulk orders",
    contactPerson: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    files: "link_to_file1.txt",
    highPriority: false,
    timeCap: 30,
    status: "notAssigned" as const,
    assignedTo: [
      {
        firstName: "Zbigniew",
        lastName: "Kaczyński",
        store: "Warszwa",
        department: "DOA",
      },
    ],
  },
  {
    requestId: "8357398374",
    createdAt: "2024-04-01T14:00:00",
    requestTypes: [
      "availability" as const,
      "priceNet" as const,
      "technicalDocumentation" as const,
    ],
    productCode: "PC002",
    collectionName: "Modern Collection",
    width: "80",
    height: "60",
    thickness: "6mm",
    finish: "Matte",
    producer: "XYZ Corp",
    color: "Black",
    productCategory: "furniture" as const,
    quantity: "50",
    additionalInfo: "Limited stock available",
    contactPerson: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "987-654-3210",
    files: "link_to_file2.txt",
    highPriority: true,
    timeCap: 120,
    status: "notAssigned" as const,
    assignedTo: [
      {
        firstName: "Jan",
        lastName: "Kowalski",
        store: "Zakopiańska",
        department: "Detal",
      },
    ],
  },
  {
    requestId: "8357398375",
    createdAt: "2024-04-01T14:00:00",
    requestTypes: ["priceNet" as const],
    productCode: "PC003",
    collectionName: "Vintage Collection",
    width: "120",
    height: "70",
    thickness: "8mm",
    finish: "Textured",
    producer: "DEF Co.",
    color: "Brown",
    productCategory: "accessories" as const,
    quantity: "80",
    additionalInfo: "Price after tax deduction",
    contactPerson: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "234-567-8901",
    files: "link_to_file3.txt",
    highPriority: false,
    timeCap: 180,
    status: "inProgress" as const,
    assignedTo: [
      {
        firstName: "Tomasz",
        lastName: "Nowak",
        store: "Jasnogórska",
        department: "Inwestycje",
      },
    ],
  },
];
