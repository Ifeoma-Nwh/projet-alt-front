import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { getUsers, findUser, deleteUser } from "../../graphql/users.server";

import { IUser } from "../../graphql/interfaces/user";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { CircularProgress } from "@chakra-ui/react";
import { Trash2 } from "lucide-react";

import { useUser } from "../../context/UserContext";

const AllUsers = () => {
  const { role } = useUser();

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useQuery<{
    FindAllUsers: IUser[];
  }>(getUsers);

  const [handleDeleteUserMutation] = useMutation(deleteUser);

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (!usersLoading && usersData && usersData.FindAllUsers) {
      setUsers(usersData.FindAllUsers);
    }
  }, [usersLoading, usersData]);

  if (usersError) {
    console.log(usersError);
    return <div>Une erreur s'est produite lors du chargement des données.</div>;
  }

  if (usersLoading) {
    return <CircularProgress isIndeterminate color="#ff4700" size="120px" />;
  }

  const handleDeleteUser = async (idUser: number) => {
    if (role === 1) {
      await handleDeleteUserMutation({
        variables: {
          deleteUserId: idUser,
        },
      });
      window.location.reload();
    }
  };

  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Email</Th>
              <Th>Rôle</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.map((user) => (
              <Tr key={user.id}>
                <Td>{user.email}</Td>
                <Td>{user.role}</Td>
                <Td>
                  {user.role !== 1 && (
                    <Trash2
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteUser(user.id)}
                    />
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllUsers;
