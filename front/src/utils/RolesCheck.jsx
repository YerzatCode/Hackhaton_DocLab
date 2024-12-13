import React from "react"

function RolesCheck({ roles, check_role, children }) {
  return (
    <>
      {roles?.map((item) => {
        if (item.name === check_role) {
          return <>{children}</>
        }
      })}
    </>
  )
}

export default RolesCheck
