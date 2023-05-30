import React from "react";
import {
  Badge, Box, Button, Card, CardBody, FormControl, FormHelperText, FormLabel, Wrap, WrapItem, Avatar,
  HStack, Heading, Input, NumberInput, NumberInputField, Select, Textarea,
  VStack, Image, Flex,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import managerStaffService, {
} from "../../services/staff-product-service";
import staffProductService from "../../services/staff-product-service";
import UserProfileView from "../../components/user/UserProfileView";


const ManagerStaffDetailPage = () => {
  return (
    <UserProfileView />
  );


};

export default ManagerStaffDetailPage;
