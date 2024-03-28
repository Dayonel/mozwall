<script lang="ts">
  import { Input } from "./ui/input";
  import { toast } from "svelte-sonner";
  import { moz, members } from "../../store";
  import { MozCard } from "../../core/MozCard";
  import { fabric } from "fabric";
  import { getIntervalPosition } from "../../core/utils";

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

      const add = filter();
      draw(add);
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
      data = [...data, { page, members: res }];
    } else {
      toast.error("Error fetching data", {
        description: response.statusText,
      });
    }
  };

  const filter = () => {
    return data
      .map((m) => {
        return m.members.filter(
          (f) =>
            searchTerm &&
            f.login.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      })
      .flat();
  };

  const draw = (members: MozMember[]) => {
    console.log($members.length);

    const cardWidth = 200;
    const cardHeight = 200;
    const padding = 16;

    const items = $moz.getObjects();
    const remove = $members.filter(
      (m) => !members.some((s) => s.login === m.login),
    );
    remove.forEach((r) => {
      const item = items.find((f) => f.name === r.login)!;
      item.animate("opacity", "0", {
        duration: 200,
        onChange: $moz.renderAll.bind($moz),
        onComplete: () => $moz.remove(item),
        easing: fabric.util.ease.easeInOutCubic,
      });
    });

    const add = members.filter(
      (m) => !$members.some((s) => s.login === m.login),
    );
    add.forEach((m, i) => {
      const position = getIntervalPosition(
        i,
        padding,
        cardWidth,
        cardHeight,
        $moz.width!,
        $moz.height!,
      );
      const mozCard = new MozCard({
        left: position.x,
        top: position.y,
        name: m.login,
        avatar: m.avatar_url,
        url: `https://github.com/${m.login}`,
        width: cardWidth,
        height: cardHeight,
      });
      mozCard.animate("opacity", "1", {
        duration: 200,
        onChange: $moz.renderAll.bind($moz),
        easing: fabric.util.ease.easeInOutCubic,
      });
      $moz.add(mozCard);
    });

    $members = members;
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
