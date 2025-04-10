import { RoleModel, UserModel, UserRoleModel } from "./model";
// Create role

async function createRole() {
  const role = new RoleModel({ name });
  await role.save();
}

//Assign Role to user

async function assignRoleToUser(userId: string, roleId: string) {
  const alreadyAssigned = await UserModel.findOne({
    user_id: userId,
    role_id: roleId,
  });
  if (alreadyAssigned) throw new Error("Role already assigned to user");
  const userRole = new UserRoleModel({ user_id: userId, role_id: roleId });

  await userRole.save();
}

// Get User Roles
async function getUserRoles(userId: string) {
  const roles = await UserRoleModel.find({ user_id: userId }).populate<{
    role_id: { name: string };
  }>("role_id");
  return roles.map((ur) => ur.role_id.name);
}

export const rbacService = {
  createRole,
  assignRoleToUser,
  getUserRoles,
};
