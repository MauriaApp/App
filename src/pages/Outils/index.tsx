import Button from "../../components/common/Layout/Button/Button";
import styles from "./Outils.module.scss";
import PageTemplate from "../Template";
import clsx from "clsx";
import { Browser } from "@capacitor/browser";
import { useHaptics } from "../../utils/hooks/useHaptics";
import { fetchToolsQuery } from "../../utils/api/api";

import { useEffect, useState } from 'react';

type ToolsType = {
  desc: string;
  button: string;
  url: string;
}


const Outils = () => {

  const { hapticsImpactLight } = useHaptics();
  const [tools, setTools] = useState<ToolsType[]>([]);

  useEffect(() => {
    const fetchTools = async () => {
      const data = await fetchToolsQuery();
      setTools(data);
    };

    fetchTools();
  }, []);

  return (
    <PageTemplate title={"Outils"}>
      <section>
        <div>
          <label className={"label"}>Vous retrouverez les outils Junia mis à disposition pour vous ici !</label>
        </div>
      </section>

      {tools.map((tool: ToolsType) => (
        <section>
          <div className={clsx("card  shadow glassy", styles["info-card"])}>
            <div>
              <p className={"text"}>
                {tool.desc}
              </p>
              <Button round variant={"accent"}
                onClick={async () => {
                  await hapticsImpactLight();
                  await Browser.open({ url: tool.url });
                }}>
                {tool.button}
              </Button>
            </div>
          </div>
        </section>
      ))}
    </PageTemplate>
  );
};

export default Outils;
