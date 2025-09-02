"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, UserX } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "USER" | "ADMIN"
  status: "ACTIVE" | "INACTIVE"
  orderCount: number
  totalSpent: number
  createdAt: string
  lastLogin: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Mock data - replace with actual API call
        setUsers([
          {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            role: "USER",
            status: "ACTIVE",
            orderCount: 5,
            totalSpent: 459.95,
            createdAt: "2024-01-10T00:00:00Z",
            lastLogin: "2024-01-15T10:30:00Z",
          },
          {
            id: "2",
            name: "Jane Smith",
            email: "jane@example.com",
            role: "USER",
            status: "ACTIVE",
            orderCount: 3,
            totalSpent: 289.5,
            createdAt: "2024-01-08T00:00:00Z",
            lastLogin: "2024-01-14T16:45:00Z",
          },
          {
            id: "3",
            name: "Admin User",
            email: "admin@example.com",
            role: "ADMIN",
            status: "ACTIVE",
            orderCount: 0,
            totalSpent: 0,
            createdAt: "2024-01-01T00:00:00Z",
            lastLogin: "2024-01-15T12:00:00Z",
          },
          {
            id: "4",
            name: "Bob Johnson",
            email: "bob@example.com",
            role: "USER",
            status: "INACTIVE",
            orderCount: 1,
            totalSpent: 99.99,
            createdAt: "2024-01-05T00:00:00Z",
            lastLogin: "2024-01-10T08:15:00Z",
          },
        ])
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleUserStatus = async (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" } : user,
      ),
    )
  }

  if (isLoading) {
    return <div>Loading users...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-600">Manage customer accounts and permissions</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "ACTIVE" ? "default" : "secondary"}>{user.status}</Badge>
                  </TableCell>
                  <TableCell>{user.orderCount}</TableCell>
                  <TableCell>${user.totalSpent.toFixed(2)}</TableCell>
                  <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleUserStatus(user.id)}
                        disabled={user.role === "ADMIN"}
                      >
                        <UserX className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
