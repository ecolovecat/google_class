import {
    Avatar,
    Box,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Icon,
    Spacer,
    Text,
} from '@chakra-ui/react';
import React from 'react';
import { IoMdMore } from 'react-icons/io';
import { FaRegSquareCheck } from 'react-icons/fa6';
import { FaRegFolder } from 'react-icons/fa';

export interface CardClassProps {
    color: string;
    headerUrl?: string;
    avataUrl: string;
    title: string;
    subTitle: string;
    ownerName: string;
}

const CardClass: React.FC<CardClassProps> = ({
    color = 'red',
    headerUrl,
    avataUrl,
    title,
    subTitle,
    ownerName,
}) => {
    return (
        <Card
            maxW="268px"
            borderWidth="1px"
            borderColor="gray.300"
            overflow="hidden"
            h="280px"
        >
            <Flex flexDirection="column" h="100%">
                <CardHeader
                    h="40%"
                    bgImage={`url(${headerUrl})`}
                    bgPosition="center"
                    bgRepeat="no-repeat"
                >
                    <Flex align="center" h="20px">
                        <Text color="white" cursor="pointer">
                            {title}
                        </Text>
                        <Spacer />
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            w={10}
                            h={10}
                            _hover={{
                                background: 'gray.500',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                transition: 'background 0.4s ease-in-out',
                            }}
                        >
                            <Icon
                                boxSize="24px"
                                color="white"
                                as={IoMdMore}
                            ></Icon>
                        </Box>
                    </Flex>
                    <Text color="white" cursor="pointer" fontSize="xs">
                        {subTitle}
                    </Text>
                    <Text color="white" cursor="pointer" fontSize="xs">
                        {ownerName}
                    </Text>
                </CardHeader>
                <CardBody
                    h="45%"
                    borderTopWidth="1px"
                    borderTopColor="gray.300"
                    borderBottomWidth="1px"
                    borderBottomColor="gray.300"
                    position="relative"
                >
                    <Avatar
                        position="absolute"
                        right="12px"
                        top="-34px"
                        h="64px"
                        w="64px"
                        src={avataUrl}
                    />
                </CardBody>
                <CardFooter h="15%" alignItems="center" justifyContent="end">
                    <Flex w="32%">
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            w={8}
                            h={8}
                            _hover={{
                                background: 'gray.200',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                transition: 'background 0.4s ease-in-out',
                            }}
                        >
                            <Icon boxSize="20px" as={FaRegSquareCheck}></Icon>
                        </Box>

                        <Spacer></Spacer>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            w={8}
                            h={8}
                            _hover={{
                                background: 'gray.200',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                transition: 'background 0.4s ease-in-out',
                            }}
                        >
                            <Icon boxSize="20px" as={FaRegFolder}></Icon>
                        </Box>
                    </Flex>
                </CardFooter>
            </Flex>
        </Card>
    );
};

export default CardClass;
