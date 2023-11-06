import Input from "../../components/common/Layout/Input/Input";

import { fetchAssos } from "../../utils/api/api";
import { AssociationType } from "../../types/association";
import { ChangeEvent, useContext, useState } from "react";
import { useEffectOnce, useLocalStorage } from "usehooks-ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./Association.module.scss";
import { ModalContext, ModalContextType } from "../../contexts/modalContext";
import AssociationCard from "../../components/Pages/Associations/AssociationCard";

import AssociationModalContent from "./AssociationModalContent/AssociationModalContent";
import PageTemplate from "../Template";

const associationsQuery = async () => {
  return await fetchAssos();
};

export default function Associations() {
  const [query, setQuery] = useState("");

  const [associations, setAssociations] = useLocalStorage<
    AssociationType[] | null
  >("associations", null);

  const { openModal } = useContext(ModalContext) as ModalContextType;

  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: ["associations"],
    queryFn: async () => await associationsQuery(),
    networkMode: "always",
  });

  const refreshMutation = useMutation({
    mutationFn: async () => {
      const newAssos = await fetchAssos();
      setAssociations(newAssos);
      return newAssos;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["associations"], data);
    },
  });

  const handleRefresh = (event: CustomEvent) => {
    refreshMutation.mutateAsync().then(() => {
      event.detail.complete();
    });
  };

  const computeModalContent = (association: AssociationType) => {
    openModal(<AssociationModalContent association={association} />);
  };

  const computeModalAsso = () => {
    openModal(<AssociationModalContent />);
  };

  useEffectOnce(() => {
    refreshMutation.mutateAsync();
  });

  if (isLoading) {
    return <PageTemplate title={"Associations"} isLoading={true} />;
  }

  return (
    <PageTemplate title={"Associations"} onRefresh={handleRefresh}>
      <Input
        placeholder={"Entre un nom..."}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setQuery(event.target.value)
        }
      />

      <section className={`section ${styles["association-list"]}`}>
        <AssociationCard
          name="Ajoute / Modifie ton asso !"
          image="https://mylow.fr/mauria/api/mauria/0.jpg"
          onClick={computeModalAsso}
        />

        {data ? (
          data
            .filter((asso: AssociationType) => {
              return (
                query === "" ||
                asso.name.toLowerCase().includes(query.toLowerCase())
              );
            })
            .map((asso: AssociationType) => {
              return (
                <AssociationCard
                  key={asso.name}
                  name={asso.name}
                  image={asso.image}
                  onClick={() => computeModalContent(asso)}
                />
              );
            })
        ) : (
          <div className={"no-content-container"}>
            <span className={"no-content-text"}>
              Aucune association enregistrée pour le moment
            </span>
          </div>
        )}
      </section>
    </PageTemplate>
  );
}
