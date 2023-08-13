import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from '../../../actions/orders/GetAllOrders' 



import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";
import { mdiFileEdit } from "@mdi/js";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { mdiHumanEdit } from "@mdi/js";
import Swal from "sweetalert2";
import { mdiSilverware } from "@mdi/js";
import { mdiShieldCrownOutline } from "@mdi/js";
import { mdiAccountOutline } from "@mdi/js";

import { mdiCarConnected } from '@mdi/js';
import { mdiCarClock } from '@mdi/js';

import ProviderPendingOrders from './ProviderPendingOrders';
import ProviderOnWayOrders from './ProviderOnWayOrders';
import ProviderDeliveredOrders from './ProviderDeliveredOrders';
const ProviderOrders = () => {






  return (
    <>
    <ProviderPendingOrders/>
    <ProviderOnWayOrders/>
    <ProviderDeliveredOrders/>
  </>
  )
}

export default ProviderOrders