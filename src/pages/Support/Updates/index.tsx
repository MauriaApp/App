import React from "react";
import styles from "../Support.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useReadLocalStorage } from "usehooks-ts";
import { fetchUpdates } from "../../../utils/api/api";
import UpdateLog from "../../../components/Pages/Support/UpdateLog";
import { MauriaUpdateLogType } from "../../../types/updateLog";
import Loader from "../../../components/common/Layout/Loader";

const Updates = () => {
  const updates = useReadLocalStorage<MauriaUpdateLogType[]>("updates");

  const { isLoading, data } = useQuery({
    queryKey: ["updates-log"],
    queryFn: async () => {
      return updates ? updates : await fetchUpdates();
    },
    networkMode: "always",
    cacheTime: 0, // https://tanstack.com/query/latest/docs/react/guides/caching?from=reactQueryV3&original=https%3A%2F%2Ftanstack.com%2Fquery%2Fv3%2Fdocs%2Fguides%2Fcaching
  });

  if (isLoading)
    return (
      <section>
        <h2 className={"sectionTitle text-primary"}>
          Journal des mises à jour
        </h2>
        <div className={styles["update-list"]}>
          <Loader />
        </div>
      </section>
    );

  return (
    <section>
      <h2 className={"sectionTitle text-primary"}>Journal des mises à jour</h2>
      <div className={styles["update-list"]}>
        {data.map((update: MauriaUpdateLogType) => (
          <UpdateLog {...update} key={update.date} />
        ))}
      </div>
    </section>
  );
};

export default Updates;
