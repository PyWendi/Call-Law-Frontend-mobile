import React from "react";
import { View, Text } from "react-native";
import { Domain } from "@/types/modelsType";
import DomainTag  from "./DomainTag";


interface DomainData {
    domains: Domain[] | [] | undefined
}

const ListDomainTag:React.FC<DomainData> = ({domains}) => {


    return (
        <View>
            <View >
                <View style={{
                    flexDirection:"row",
                    width:"100%",
                    justifyContent: "flex-start",
                    alignContent: "stretch",
                    // alignItems: "center",
                    flexWrap: "wrap"
                }}>
                    {(domains.length != 0)?
                    
                        domains.map((domain, index) => (
                            <DomainTag key={index} domainName={domain.name} />
                        )
                    )
                    : 
                    (
                        <Text style={{
                            color: "grey",

                        }}>
                            No domain associate to this lawyer
                        </Text>
                    )
                }
                </View>
            </View>
        </View>
    )
}


export default ListDomainTag;