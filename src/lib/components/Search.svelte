<script lang="ts">
  import { Input } from "./ui/input";
  import { toast } from "svelte-sonner";
  import { moz } from "../../store";

  let members: MozMembers[] = [];
  let results: MozMember[] = [];
  let searchTerm = "";
  let page = 1;
  let loading = false;

  const search = async () => {
    try {
      if (members && members.length > 0) {
        const exist =
          members.find((f) => f.page === page && members)!.members.length > 0; // we have this page

        if (exist) {
          filter();
          return;
        }
      }

      loading = true;
      await query();
      filter();
    } catch (error: any) {
      toast.error("Error fetching data", {
        description: error.message,
      });
    } finally {
      loading = false;
    }
  };

  const query = async () => {
    const url = `https://api.github.com/orgs/mozilla/members?page=${page}`;
    const response = await fetch(url);

    if (response.ok) {
      const res = await response.json();
      members = [...members, { page, members: res }];
    } else {
      toast.error("Error fetching data", {
        description: response.statusText,
      });
    }
  };

  const filter = () => {
    const match = members.reduce((acc: MozMember[], curr: MozMembers) => {
      const filter = curr.members.filter((m) =>
        m.login.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      return [...acc, ...filter];
    }, []);

    console.log(match);

    results = [...results, ...match];
  };
</script>

<div class="search">
  <Input
    type="text"
    placeholder="Search users..."
    class="max-w-full md:max-w-60 lg:max-w-96 h-full"
    bind:value={searchTerm}
    on:keydown={search}
  />

  {#if loading}
    <svg
      class="spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  {/if}
</div>

<style>
  .search {
    @apply relative flex w-full max-w-full md:max-w-60 lg:max-w-96;
  }

  .spin {
    @apply absolute top-2 right-0 animate-spin -ml-1 mr-3 h-5 w-5 text-white pointer-events-none;
  }

  .spin circle {
    @apply stroke-black dark:stroke-current;
  }
  .spin path {
    @apply fill-black dark:fill-current;
  }
</style>
