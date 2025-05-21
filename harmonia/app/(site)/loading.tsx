"use client";

import Box from "@/components/Box";
import { BounceLoader } from "react-spinners";

const Loading = () => {
    return(
        <Box className="h-full flex items-center justifiy-center">
            <BounceLoader color="#000000" size={40} />
        </Box>
    )
};

export default Loading;