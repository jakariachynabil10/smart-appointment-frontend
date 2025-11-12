/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import {
  useDeleteUserByIdMutation,
  useGetAllUserQuery,
} from "@/redux/api/userApi";
import toast from "react-hot-toast";

const UserManagement = () => {
  const pathname = usePathname();
  const { data: usersData, isLoading: isUserLoading } = useGetAllUserQuery();
  const [deleteUserById, { isLoading: isDeleting }] = useDeleteUserByIdMutation();

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteUserById(id).unwrap();
      toast.success("User Deleted Successfully")
      console.log(result);
    } catch (error: any) {
      console.error("Error deleting user:", error);
      alert("❌ Failed to delete user. Please try again.");
    }
  };

  // ✅ Show only first 5 users if on /dashboard/admin
  const displayedUsers =
    pathname === "/dashboard/admin"
      ? usersData?.slice(0, 5)
      : usersData;

  return (
    <>
      <Box className="flex justify-between items-center my-4">
        <Typography variant="h6" className="font-semibold">
          User Management
        </Typography>

        {/* ✅ Show View All button only on admin dashboard */}
        {pathname === "/dashboard/admin" && (
          <Link href="/dashboard/admin/users">
            <Button variant="outlined" size="small">
              View All
            </Button>
          </Link>
        )}
      </Box>

      <Card className="shadow-md rounded-2xl mb-8">
        <CardContent>
          {isUserLoading ? (
            <Typography>Loading users...</Typography>
          ) : (
            <Table
              sx={{ borderCollapse: "separate", borderSpacing: "0 10px" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ border: "none", fontWeight: 600 }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ border: "none", fontWeight: 600 }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ border: "none", fontWeight: 600 }}>
                    Role
                  </TableCell>
                  <TableCell sx={{ border: "none", fontWeight: 600 }}>
                    Joined
                  </TableCell>
                  <TableCell sx={{ border: "none", fontWeight: 600 }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {displayedUsers
                  ?.filter((u: any) => u.role !== "SUPERADMIN")
                  .map((user: any, i: number) => (
                    <TableRow
                      key={i}
                      sx={{
                        border: "none",
                        backgroundColor: "white",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                        borderRadius: "12px",
                        "&:hover": { backgroundColor: "#f9fafb" },
                      }}
                    >
                      <TableCell sx={{ border: "none", py: 2 }}>
                        {user?.name}
                      </TableCell>
                      <TableCell sx={{ border: "none", py: 2 }}>
                        {user?.email}
                      </TableCell>
                      <TableCell sx={{ border: "none", py: 2 }}>
                        {user?.role}
                      </TableCell>
                      <TableCell sx={{ border: "none", py: 2 }}>
                        {new Date(user?.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          disabled={isDeleting}
                          onClick={() => handleDelete(user.id)}
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default UserManagement;
