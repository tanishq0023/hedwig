import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import SidebarSkeleton from './skeletons/SidebarSkeleton'
import { Users } from 'lucide-react'

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore()
  const { onlineUsers } = useAuthStore()

  const [showOnlineOnly, setShowOnlineOnly] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const searchedUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const finalFilteredUsers = showOnlineOnly
    ? searchedUsers.filter(user => onlineUsers.includes(user._id))
    : searchedUsers

  if (isUsersLoading) return <SidebarSkeleton />

  return (
    <aside className='h-full w-full lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Users</span>
        </div>
        <div className="mt-3 flex flex-col gap-2 px-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search contacts..."
            className="input input-sm input-bordered w-full"
          />
          <label className="cursor-pointer flex items-center gap-2 text-sm pt-4">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            Show online only
            <span className="text-xs text-zinc-500 ml-auto">({onlineUsers.length!==0 ? onlineUsers.length - 1 : 0} online)</span>
          </label>
        </div>
      </div>

      <div className='overflow-y-auto w-full py-3'>
        {finalFilteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className='relative'>
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-1 ring-zinc-900"
                />
              )}
            </div>

            {/* Show user name and status on all screen sizes */}
            <div className="text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {finalFilteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No users found</div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar