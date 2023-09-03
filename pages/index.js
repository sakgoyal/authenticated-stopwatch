import Head from "next/head";
import { useState, useEffect } from "react";
import UserSearch from './UserSearch';


export default function Home() {
  return (
    <>
      <div>
        <h1>User Data Search</h1>
        <UserSearch />
      </div>
    </>
  );
}
