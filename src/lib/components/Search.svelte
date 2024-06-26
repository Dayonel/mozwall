<script lang="ts">
  import { Input } from "./ui/input";
  import { toast } from "svelte-sonner";
  import { members } from "../../store";

  let data: MozMembers[] = [];
  let searchTerm = "";
  let page = 1;
  let loading = false;

  const search = async () => {
    try {
      let exist =
        data &&
        data.length > 0 &&
        data.find((f) => f.page === page && members)!.members.length > 0; // we have this page

      if (!exist) {
        loading = true;
        await query();
      }

      $members = filter();
    } catch (error: any) {
      toast.error("Error fetching data", {
        description: error.message,
      });
    } finally {
      loading = false;
    }
  };

  const query = async (): Promise<MozMembers[]> => {
    const url = `https://api.github.com/orgs/mozilla/members?page=${page}`;
    const response = await fetch(url);

    if (response.ok) {
      const res = await response.json();
      return (data = [...data, { page, members: res }]);
    } else {
      toast.error("Error fetching data", {
        description: response.statusText,
      });
    }

    return [];
  };

  const filter = () => {
    return new Map(
      data
        .map((m) => {
          return m.members.filter(
            (f) =>
              searchTerm &&
              f.login.toLowerCase().includes(searchTerm.toLowerCase()),
          );
        })
        .flat()
        .map((m) => [m.login, m]),
    );
  };
</script>

<div class="search">
  <Input
    type="text"
    placeholder="Search users..."
    class="max-w-full md:max-w-60 lg:max-w-96 h-full"
    bind:value={searchTerm}
    on:input={search}
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
