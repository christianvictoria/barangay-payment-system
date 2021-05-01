-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 01, 2021 at 05:51 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_barangay_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_blotter_case_categories`
--

CREATE TABLE `tbl_blotter_case_categories` (
  `case_id` int(10) NOT NULL,
  `case_category` char(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_blotter_case_categories`
--

INSERT INTO `tbl_blotter_case_categories` (`case_id`, `case_category`) VALUES
(1, 'Domestic Violence'),
(2, 'Petty Crime'),
(3, 'Contract Dispute'),
(4, 'Property Dispute'),
(5, 'Tort'),
(6, 'Barangay Complaint');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_blotter_complainant`
--

CREATE TABLE `tbl_blotter_complainant` (
  `comp_id` int(10) NOT NULL,
  `case_id` int(10) NOT NULL,
  `comp_fname` varchar(255) NOT NULL,
  `comp_mname` varchar(255) NOT NULL,
  `comp_lname` varchar(255) NOT NULL,
  `comp_age` int(3) NOT NULL,
  `comp_sex` int(1) NOT NULL,
  `comp_bday` date NOT NULL,
  `comp_housenum` varchar(50) NOT NULL,
  `comp_street` varchar(50) NOT NULL,
  `comp_barangay` varchar(50) NOT NULL,
  `comp_city` varchar(50) NOT NULL,
  `comp_province` varchar(50) NOT NULL,
  `comp_contactnum` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_blotter_complainant`
--

INSERT INTO `tbl_blotter_complainant` (`comp_id`, `case_id`, `comp_fname`, `comp_mname`, `comp_lname`, `comp_age`, `comp_sex`, `comp_bday`, `comp_housenum`, `comp_street`, `comp_barangay`, `comp_city`, `comp_province`, `comp_contactnum`) VALUES
(1, 1, 'Joshmel', 'Facurib', 'Senting', 21, 0, '0000-00-00', '100', 'New Street', 'New Cabalan', 'Olongapo city', 'Zambales', '09999999999'),
(2, 2, 'John', 'Doe', 'Moris', 33, 0, '0000-00-00', 'Sample Housenum', 'Sample Street', 'Sample Barangay', 'Sample City', 'Sample Province', '09999999999');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_blotter_complaint_archive`
--

CREATE TABLE `tbl_blotter_complaint_archive` (
  `archive_id` int(50) NOT NULL,
  `arc_compinfo_id` int(50) NOT NULL,
  `arc_case_id` int(50) NOT NULL,
  `arc_compinfo_status` text NOT NULL,
  `arc_compinfo_details` text NOT NULL,
  `arc_cominfo_time` time NOT NULL,
  `arc_cominfo_date` date NOT NULL,
  `archiving_date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `arc_brgy_rep_id` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_blotter_complaint_infos`
--

CREATE TABLE `tbl_blotter_complaint_infos` (
  `compinfo_id` int(10) NOT NULL,
  `case_id` int(10) NOT NULL,
  `compinfo_status` char(50) NOT NULL,
  `compinfo_details` varchar(500) NOT NULL,
  `compinfo_date` date DEFAULT NULL,
  `compinfo_time` time DEFAULT NULL,
  `compinfo_loc` varchar(50) NOT NULL,
  `record_date` date NOT NULL DEFAULT current_timestamp(),
  `record_time` time NOT NULL DEFAULT current_timestamp(),
  `update_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `brgyrep_id` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_blotter_complaint_infos`
--

INSERT INTO `tbl_blotter_complaint_infos` (`compinfo_id`, `case_id`, `compinfo_status`, `compinfo_details`, `compinfo_date`, `compinfo_time`, `compinfo_loc`, `record_date`, `record_time`, `update_date`, `brgyrep_id`) VALUES
(1, 1, 'Unsettled', 'sample description', NULL, '08:00:00', 'Court', '2021-04-20', '17:20:10', '2021-04-20 09:20:10', '3'),
(2, 2, 'Unsettled', 'Sample Detail', '2021-04-24', '07:00:00', 'Sample Location', '2021-04-20', '17:26:40', '2021-04-20 09:26:40', '3');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_blotter_complaint_respondent`
--

CREATE TABLE `tbl_blotter_complaint_respondent` (
  `respondent_id` int(11) NOT NULL,
  `case_id` int(10) NOT NULL,
  `res_id` int(50) NOT NULL,
  `respondent_contact_no` bigint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_blotter_complaint_respondent`
--

INSERT INTO `tbl_blotter_complaint_respondent` (`respondent_id`, `case_id`, `res_id`, `respondent_contact_no`) VALUES
(1, 1, 4, 9877787656),
(2, 2, 4, 43526374567);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_blotter_complaint_schedule`
--

CREATE TABLE `tbl_blotter_complaint_schedule` (
  `schedule_id` int(50) NOT NULL,
  `sc_compinfo_id` int(11) NOT NULL,
  `sc_cominfo_status` text NOT NULL,
  `scheduled_date` date NOT NULL,
  `scheduled_time` time NOT NULL,
  `mediator_id` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_blotter_complaint_schedule`
--

INSERT INTO `tbl_blotter_complaint_schedule` (`schedule_id`, `sc_compinfo_id`, `sc_cominfo_status`, `scheduled_date`, `scheduled_time`, `mediator_id`) VALUES
(1, 1, 'Scheduled', '2021-04-30', '08:18:20', 22);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_blotter_incidents_archive`
--

CREATE TABLE `tbl_blotter_incidents_archive` (
  `inci_archive_id` int(11) NOT NULL,
  `arc_inc_id` int(11) NOT NULL,
  `arc_inc_nature` text NOT NULL,
  `arc_inc_location` text NOT NULL,
  `arc_inci_date` date NOT NULL,
  `arc_inci_time` time NOT NULL,
  `arc_inci_details` text NOT NULL,
  `inci_archive_date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `arc_inci_brgy_rep_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_blotter_incidents_infos`
--

CREATE TABLE `tbl_blotter_incidents_infos` (
  `rec_no` int(10) NOT NULL,
  `inci_id` int(10) NOT NULL,
  `nature_id` int(10) NOT NULL,
  `inci_loc` varchar(255) NOT NULL,
  `inci_date` date NOT NULL,
  `inci_time` time NOT NULL,
  `inci_details` varchar(500) NOT NULL,
  `rec_time` time DEFAULT NULL,
  `rec_date` date DEFAULT NULL,
  `brgyrep_id` varchar(50) NOT NULL,
  `rec_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_blotter_incidents_infos`
--

INSERT INTO `tbl_blotter_incidents_infos` (`rec_no`, `inci_id`, `nature_id`, `inci_loc`, `inci_date`, `inci_time`, `inci_details`, `rec_time`, `rec_date`, `brgyrep_id`, `rec_updated`) VALUES
(1, 1, 1, 'Mabayuan', '2021-04-04', '21:52:36', 'Nasunog dahil hot', '21:52:36', '2021-04-05', '600', '2021-04-13 14:32:40');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_blotter_incidents_nature`
--

CREATE TABLE `tbl_blotter_incidents_nature` (
  `nature_id` int(10) NOT NULL,
  `nature_name` char(50) NOT NULL,
  `nature_desc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_blotter_incidents_nature`
--

INSERT INTO `tbl_blotter_incidents_nature` (`nature_id`, `nature_name`, `nature_desc`) VALUES
(1, 'Fire', 'Nasunog');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_blotter_incidents_reporter`
--

CREATE TABLE `tbl_blotter_incidents_reporter` (
  `inci_id` int(10) NOT NULL,
  `res_id` int(10) NOT NULL,
  `rep_contact_no` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_blotter_incidents_reporter`
--

INSERT INTO `tbl_blotter_incidents_reporter` (`inci_id`, `res_id`, `rep_contact_no`) VALUES
(1, 4, 9192631555);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_clinic_appointments`
--

CREATE TABLE `tbl_clinic_appointments` (
  `appointment_id` int(11) NOT NULL,
  `fld_apptdate` date NOT NULL,
  `fld_time` time NOT NULL,
  `fld_status` int(11) NOT NULL DEFAULT 0,
  `fld_date_added` timestamp NOT NULL DEFAULT current_timestamp(),
  `fld_isDeleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_clinic_appointments`
--

INSERT INTO `tbl_clinic_appointments` (`appointment_id`, `fld_apptdate`, `fld_time`, `fld_status`, `fld_date_added`, `fld_isDeleted`) VALUES
(202118706, '2021-04-30', '05:00:00', 1, '2021-04-13 08:11:30', 0),
(202118707, '2021-04-27', '06:30:00', 2, '2021-04-13 08:26:35', 0),
(202118708, '2021-04-13', '05:30:00', 0, '2021-04-13 08:27:49', 0),
(202118709, '2021-04-13', '08:00:00', 0, '2021-04-13 08:28:02', 0),
(202118710, '2021-04-14', '15:00:00', 0, '2021-04-13 08:28:11', 0),
(202118711, '2021-04-27', '06:00:00', 0, '2021-04-13 08:53:20', 0),
(202118712, '2021-04-30', '06:00:00', 0, '2021-04-13 08:54:40', 0),
(202118713, '2021-04-14', '06:00:00', 1, '2021-04-14 06:55:15', 0),
(202118714, '2021-04-15', '06:00:00', 1, '2021-04-14 07:35:37', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_clinic_checkups`
--

CREATE TABLE `tbl_clinic_checkups` (
  `checkup_id` int(11) NOT NULL,
  `medOrder_id` int(100) DEFAULT NULL,
  `appointment_id` int(100) NOT NULL,
  `patient_id` int(111) DEFAULT 0,
  `hprof_id` int(11) DEFAULT NULL,
  `payment_id` int(100) DEFAULT NULL,
  `fld_amount` double NOT NULL DEFAULT 0,
  `fld_startTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `fld_endTime` time DEFAULT NULL,
  `fld_inProgress` int(11) NOT NULL DEFAULT 0,
  `fld_symptoms` varchar(255) DEFAULT 'Please update patient symptoms',
  `fld_findings` varchar(255) DEFAULT 'Please update findings',
  `fld_remarks` varchar(255) DEFAULT 'Please update remarks',
  `fld_date_added` timestamp NOT NULL DEFAULT current_timestamp(),
  `fld_isDeleted` int(111) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_clinic_checkups`
--

INSERT INTO `tbl_clinic_checkups` (`checkup_id`, `medOrder_id`, `appointment_id`, `patient_id`, `hprof_id`, `payment_id`, `fld_amount`, `fld_startTime`, `fld_endTime`, `fld_inProgress`, `fld_symptoms`, `fld_findings`, `fld_remarks`, `fld_date_added`, `fld_isDeleted`) VALUES
(109, 2021131581, 202118706, 1, 3, NULL, 550, '2021-04-13 11:41:52', '06:00:00', 1, 'Please update patient symptoms', 'Please update findings', 'Please update remarks', '2021-04-13 11:41:52', 0),
(110, NULL, 202118713, 3, NULL, NULL, 500, '2021-04-14 06:55:20', NULL, 0, 'Please update patient symptoms', 'Please update findings', 'Please update remarks', '2021-04-14 06:55:20', 0),
(111, 2021191365, 202118714, 5, NULL, NULL, 200, '2021-04-14 07:35:54', '06:00:00', 1, 'Please update patient symptoms', 'Please update findings', 'Please update remarks', '2021-04-14 07:35:54', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_clinic_healthprofs`
--

CREATE TABLE `tbl_clinic_healthprofs` (
  `hprof_id` int(11) NOT NULL,
  `hprof_lname` varchar(100) NOT NULL,
  `hprof_fname` varchar(100) NOT NULL,
  `hprof_mname` varchar(100) NOT NULL,
  `hprof_ext` varchar(100) NOT NULL,
  `hprof_gender` int(1) NOT NULL,
  `hprof_age` int(3) NOT NULL,
  `hprof_specialization` varchar(100) NOT NULL,
  `fld_isDeleted` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_clinic_healthprofs`
--

INSERT INTO `tbl_clinic_healthprofs` (`hprof_id`, `hprof_lname`, `hprof_fname`, `hprof_mname`, `hprof_ext`, `hprof_gender`, `hprof_age`, `hprof_specialization`, `fld_isDeleted`) VALUES
(1, 'Austria', 'Jim Caesar', 'Gonzales', 'II', 1, 25, 'Nurse', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_clinic_medicines`
--

CREATE TABLE `tbl_clinic_medicines` (
  `med_id` int(10) NOT NULL,
  `med_name` varchar(255) NOT NULL,
  `med_desc` varchar(255) DEFAULT NULL,
  `med_price` double NOT NULL,
  `fld_date_added` timestamp NOT NULL DEFAULT current_timestamp(),
  `fld_isDeleted` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_clinic_medicines`
--

INSERT INTO `tbl_clinic_medicines` (`med_id`, `med_name`, `med_desc`, `med_price`, `fld_date_added`, `fld_isDeleted`) VALUES
(8, 'Paracetamol (Biogesic) Tablet 500mg', 'For the relief of minor aches and pains such as headache, backache, menstrua cramps, muscular aches, minor arthritis pain, toothache, and pain associated with common cold and flu.ss', 4.75, '2021-03-31 08:12:18', 0),
(9, 'Alaxan FR ', 's', 8.75, '2021-03-31 11:47:43', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_clinic_medicine_orders`
--

CREATE TABLE `tbl_clinic_medicine_orders` (
  `medOrder_id` int(10) NOT NULL,
  `fld_totalQuantity` double NOT NULL,
  `fld_totalAmount` char(50) NOT NULL,
  `fld_date_ordered` timestamp NOT NULL DEFAULT current_timestamp(),
  `fld_isDeleted` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_clinic_medicine_orders`
--

INSERT INTO `tbl_clinic_medicine_orders` (`medOrder_id`, `fld_totalQuantity`, `fld_totalAmount`, `fld_date_ordered`, `fld_isDeleted`) VALUES
(2021116693, 45, '213.75', '2021-04-13 11:21:58', 0),
(2021131581, 5, '23.75', '2021-04-14 05:22:51', 0),
(2021136234, 10, '67.5', '2021-04-13 12:34:14', 0),
(2021183081, 5, '23.75', '2021-04-13 12:26:19', 0),
(2021191365, 105, '518.75', '2021-04-14 07:37:05', 0),
(2021196321, 105, '618.75', '2021-04-14 07:53:17', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_clinic_med_suppliers`
--

CREATE TABLE `tbl_clinic_med_suppliers` (
  `supplier_id` int(10) NOT NULL,
  `supplier_name` varchar(50) NOT NULL,
  `supplier_company` varchar(100) NOT NULL,
  `supplier_contact` varchar(50) NOT NULL,
  `fld_date_added` timestamp NOT NULL DEFAULT current_timestamp(),
  `fld_isDeleted` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_clinic_med_suppliers`
--

INSERT INTO `tbl_clinic_med_suppliers` (`supplier_id`, `supplier_name`, `supplier_company`, `supplier_contact`, `fld_date_added`, `fld_isDeleted`) VALUES
(1, 'TPR Medical, Olongapo Branch', 'TPR Medical Distributors, Inc.', '(02) 8372 7978', '2021-03-31 04:12:53', 0),
(2, 'Medical Supplies Depot, Pampanga Branch', 'Md3c Medical Supplies Inc', '+63930-321-4321', '2021-03-31 04:25:20', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_clinic_order_details`
--

CREATE TABLE `tbl_clinic_order_details` (
  `order_detail_id` int(11) NOT NULL,
  `med_order_id` int(11) NOT NULL,
  `med_id` int(11) NOT NULL,
  `fld_orderQuantity` double NOT NULL,
  `fld_orderAmount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_clinic_order_details`
--

INSERT INTO `tbl_clinic_order_details` (`order_detail_id`, `med_order_id`, `med_id`, `fld_orderQuantity`, `fld_orderAmount`) VALUES
(126, 2021109245, 8, 110, 440),
(127, 2021128147, 8, 20, 80),
(128, 2021139163, 8, 5, 20),
(129, 2021199518, 8, 165, 660),
(130, 2021117947, 8, 300, 1200),
(131, 2021138127, 9, 222, 1776),
(132, 2021116693, 8, 45, 214),
(133, 2021183081, 8, 5, 24),
(134, 2021136234, 8, 5, 24),
(135, 2021136234, 9, 5, 44),
(136, 2021131581, 8, 5, 24),
(137, 2021191365, 8, 100, 475),
(138, 2021191365, 9, 5, 44),
(139, 2021196321, 8, 75, 356),
(140, 2021196321, 9, 30, 263);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_clinic_supplies`
--

CREATE TABLE `tbl_clinic_supplies` (
  `supply_id` int(10) NOT NULL,
  `supplier_id` int(10) NOT NULL,
  `med_id` int(10) NOT NULL,
  `fld_quantity` int(10) NOT NULL,
  `fld_orderedAt` date NOT NULL DEFAULT current_timestamp(),
  `fld_arrivesAt` date DEFAULT NULL,
  `fld_hasArrived` int(1) NOT NULL DEFAULT 0,
  `fld_expiryDate` date DEFAULT NULL,
  `fld_isDeleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_clinic_supplies`
--

INSERT INTO `tbl_clinic_supplies` (`supply_id`, `supplier_id`, `med_id`, `fld_quantity`, `fld_orderedAt`, `fld_arrivesAt`, `fld_hasArrived`, `fld_expiryDate`, `fld_isDeleted`) VALUES
(11, 1, 8, 100, '2021-01-04', '2021-01-13', 1, '2025-10-17', 0),
(12, 1, 8, 100, '2021-03-31', '2021-03-23', 1, '2024-10-21', 0),
(13, 1, 9, 100, '2021-03-31', '2021-03-21', 1, '2025-10-13', 0),
(14, 1, 8, 0, '2021-03-31', '2021-05-11', 1, '2021-04-17', 0),
(15, 2, 8, 100, '2021-04-01', '2021-05-31', 1, '2024-09-15', 0),
(16, 1, 8, 10, '2021-04-01', '2021-04-18', 1, '2021-04-17', 0),
(17, 1, 8, 100, '2021-04-05', '2021-04-05', 1, '2025-10-16', 0),
(18, 2, 9, 60, '2021-04-06', '2021-04-04', 1, '2021-04-29', 0),
(19, 1, 8, 100, '2021-04-10', '2021-04-09', 1, '2022-11-21', 0),
(20, 1, 8, 100, '2021-04-11', '2021-04-13', 1, '2025-04-13', 0),
(21, 1, 9, 100, '2021-04-11', NULL, 0, NULL, 0),
(22, 2, 9, 55, '2021-04-13', NULL, 0, NULL, 0),
(23, 2, 9, 178, '2021-04-13', '2021-04-12', 1, '2025-06-10', 0),
(24, 2, 8, 155, '2021-04-13', '2021-04-12', 1, '2025-11-24', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_docuissuance_doctransaction`
--

CREATE TABLE `tbl_docuissuance_doctransaction` (
  `trans_id` int(10) NOT NULL,
  `res_id` int(10) NOT NULL,
  `docu_id` int(10) NOT NULL,
  `trans_purpose` char(50) NOT NULL,
  `isArchived` int(1) NOT NULL DEFAULT 0,
  `trans_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_docuissuance_doctransaction`
--

INSERT INTO `tbl_docuissuance_doctransaction` (`trans_id`, `res_id`, `docu_id`, `trans_purpose`, `isArchived`, `trans_date`) VALUES
(1, 1, 1, 'educational support', 0, '2021-03-31 05:25:34'),
(2, 3, 2, 'for job application', 0, '2021-03-31 05:45:09');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_docuissuance_documents`
--

CREATE TABLE `tbl_docuissuance_documents` (
  `docu_id` int(10) NOT NULL,
  `docu_type` char(50) NOT NULL,
  `docu_prc` char(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_docuissuance_documents`
--

INSERT INTO `tbl_docuissuance_documents` (`docu_id`, `docu_type`, `docu_prc`) VALUES
(1, 'Barangay Clearance', '100'),
(2, 'Barangay Indigency', '100'),
(3, 'Barangay Residency', '100');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_feedback_accounts`
--

CREATE TABLE `tbl_feedback_accounts` (
  `acc_id` int(11) NOT NULL,
  `res_id` int(10) NOT NULL,
  `fld_contact_num` char(11) NOT NULL,
  `fld_fname` varchar(255) NOT NULL,
  `fld_lname` varchar(255) NOT NULL,
  `fld_mname` varchar(255) DEFAULT NULL,
  `fld_uname` char(50) NOT NULL,
  `fld_pwd` varchar(255) NOT NULL,
  `fld_is_admin` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_feedback_categories`
--

CREATE TABLE `tbl_feedback_categories` (
  `category_id` int(10) NOT NULL,
  `fld_event_type` char(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_feedback_feedbacks`
--

CREATE TABLE `tbl_feedback_feedbacks` (
  `fb_id` int(10) NOT NULL,
  `fb_status` int(10) NOT NULL,
  `fb_message` varchar(255) DEFAULT NULL,
  `fb_date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `category_id` int(10) NOT NULL,
  `acc_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_feedback_forms`
--

CREATE TABLE `tbl_feedback_forms` (
  `form_id` int(10) NOT NULL,
  `fld_form_title` varchar(255) NOT NULL,
  `fld_form_description` varchar(255) NOT NULL,
  `fb_date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fld_is_active` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_feedback_genform`
--

CREATE TABLE `tbl_feedback_genform` (
  `genform_id` int(255) NOT NULL,
  `category_id` int(10) NOT NULL,
  `form_id` int(255) NOT NULL,
  `fld_form_type` enum('radiobutton','checkbox','text','') NOT NULL,
  `fld_question` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_payment_expenses`
--

CREATE TABLE `tbl_payment_expenses` (
  `exp_id` int(10) NOT NULL,
  `person_lname` char(50) NOT NULL,
  `person_fname` char(50) NOT NULL,
  `person_mname` char(50) DEFAULT NULL,
  `exp_for` varchar(255) NOT NULL,
  `exp_desc` varchar(255) NOT NULL,
  `exp_money_release` int(30) NOT NULL,
  `exp_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `exp_isDeleted` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_payment_expenses`
--

INSERT INTO `tbl_payment_expenses` (`exp_id`, `person_lname`, `person_fname`, `person_mname`, `exp_for`, `exp_desc`, `exp_money_release`, `exp_date`, `exp_isDeleted`) VALUES
(1, 'Alip', 'Christian', 'Victoria', 'Construction Materials', 'Barangay Hall Expansion', 10000, '2021-04-30 03:28:50', 0),
(2, 'Mijares', 'Gerrylyn', 'Manaloto', 'Barangay Event', 'Dance Competition', 20000, '2021-05-01 01:44:11', 0),
(3, '', '', '', '', '', 0, '2021-05-01 03:25:11', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_payment_payments`
--

CREATE TABLE `tbl_payment_payments` (
  `pt_id` int(10) NOT NULL,
  `checkup_id` int(10) DEFAULT NULL,
  `order_detail_id` int(11) DEFAULT NULL,
  `trans_id` int(10) DEFAULT NULL,
  `pt_money_recieved` char(50) NOT NULL,
  `pt_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `pt_isPayed` int(1) NOT NULL DEFAULT 0,
  `pt_isDeleted` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_payment_payments`
--

INSERT INTO `tbl_payment_payments` (`pt_id`, `checkup_id`, `order_detail_id`, `trans_id`, `pt_money_recieved`, `pt_date`, `pt_isPayed`, `pt_isDeleted`) VALUES
(1, NULL, 140, NULL, '618.75', '2021-04-26 05:57:17', 0, 0),
(2, 109, NULL, NULL, '550', '2021-04-26 05:58:34', 1, 0),
(3, NULL, NULL, 1, '50', '2021-04-26 05:59:47', 0, 0),
(4, NULL, 140, NULL, '1000', '2021-04-26 06:13:06', 1, 1),
(5, 109, NULL, NULL, '500', '2021-04-28 02:02:49', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_profiling_residents`
--

CREATE TABLE `tbl_profiling_residents` (
  `res_id` int(10) NOT NULL,
  `res_lname` char(50) NOT NULL,
  `res_fname` char(50) NOT NULL,
  `res_mname` char(50) NOT NULL,
  `res_ext` char(50) NOT NULL,
  `res_gender` int(1) NOT NULL,
  `res_civilstatus` int(11) NOT NULL,
  `res_birthdate` char(255) NOT NULL,
  `res_age` int(11) NOT NULL,
  `res_no` char(10) NOT NULL,
  `res_street` char(20) NOT NULL,
  `res_barangay` char(20) NOT NULL,
  `res_city` char(20) NOT NULL,
  `res_province` char(20) NOT NULL,
  `res_zip` int(4) NOT NULL,
  `res_img` longtext NOT NULL,
  `res_status` int(1) NOT NULL DEFAULT 1,
  `res_timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_profiling_residents`
--

INSERT INTO `tbl_profiling_residents` (`res_id`, `res_lname`, `res_fname`, `res_mname`, `res_ext`, `res_gender`, `res_civilstatus`, `res_birthdate`, `res_age`, `res_no`, `res_street`, `res_barangay`, `res_city`, `res_province`, `res_zip`, `res_img`, `res_status`, `res_timestamp`) VALUES
(1, 'Alip', 'Christian', 'Victoria', '', 2, 0, '1997-08-22', 0, '1634', 'balic-balic', 'Sta. Rita', 'Olongapo City', 'Zambales', 2200, 'data:image/jpeg;base64,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', 1, '2021-04-13 02:11:58'),
(3, 'Doe', 'John', 'Moris', '', 2, 0, '2021-03-31', 0, '1634', 'balic-balic', 'Sta. Rita', 'Olongapo City', 'Zambales', 2200, 'data:image/jpeg;base64,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', 1, '2021-04-13 02:12:01'),
(4, 'Sevilla', 'Marc Roger', '', '', 1, 1, '10/22/1999', 21, '004', 'Alagaw', 'Mabayuan', 'Olongapo City', 'Zambales', 200, '', 1, '2021-04-13 14:34:10'),
(5, 'Gonzaga', 'Mark', 'J', '', 2, 0, '2004-01-20', 0, '1801', 'Clark Street', 'Sta Rita', 'Olongapo City', 'Zambales', 2200, 'data:image/jpeg;base64,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', 1, '2021-04-13 02:12:05');
INSERT INTO `tbl_profiling_residents` (`res_id`, `res_lname`, `res_fname`, `res_mname`, `res_ext`, `res_gender`, `res_civilstatus`, `res_birthdate`, `res_age`, `res_no`, `res_street`, `res_barangay`, `res_city`, `res_province`, `res_zip`, `res_img`, `res_status`, `res_timestamp`) VALUES
(12, 'Inociete', 'Bernie', 'Legua', 'Jr.', 1, 1, '2000-01-17T16:00:00.000Z', 0, 'No. 1687', 'Dominguez St.', 'Sta. Rita', 'Olongapo City', 'Zambales', 2200, 'data:image/jpeg;base64,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', 0, '2021-04-13 02:26:16'),
(13, 'Inociete', 'Bernie', 'Legua', 'Jr.', 1, 1, '2000-01-17T16:00:00.000Z', 0, 'No. 1687', 'Dominguez St.', 'Sta. Rita', 'Olongapo City', 'Zambales', 2200, 'data:image/jpeg;base64,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', 0, '2021-04-13 02:47:38'),
(14, 'Inociete', 'Bernie', 'Legua', 'jr.', 1, 1, '2000-01-17T16:00:00.000Z', 0, 'No. 1687', 'Dominguez', 'Sta. Rita', 'Olongapo City', 'Zambales', 2200, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAUFBQUFBQUGBgUICAcICAsKCQkKCxEMDQwNDBEaEBMQEBMQGhcbFhUWGxcpIBwcICkvJyUnLzkzMzlHREddXX0BBQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/CABEIAWgBaAMBIQACEQEDEQH/', 0, '2021-04-13 00:40:30'),
(15, 'Flores', 'Ralph Martin', 'Primero', '', 1, 1, '2000-01-17T16:00:00.000Z', 0, '1672', 'Balic-Balic', 'Sta. Rita', 'Olongapo City', 'Zambales', 2200, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAUFBQUFBQUGBgUICAcICAsKCQkKCxEMDQwNDBEaEBMQEBMQGhcbFhUWGxcpIBwcICkvJyUnLzkzMzlHREddXX0BBQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/CABEIAWgBaAMBIQACEQEDEQH/', 0, '2021-04-13 01:52:17'),
(16, 'Flores', 'Ralph Martin', 'Primero', '', 1, 1, '2000-01-17T16:00:00.000Z', 0, '1672', 'Balic-Balic', 'Sta. Rita', 'Olongapo City', 'Zambales', 2200, 'data:image/jpeg;base64,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', 0, '2021-04-13 02:25:00');
INSERT INTO `tbl_profiling_residents` (`res_id`, `res_lname`, `res_fname`, `res_mname`, `res_ext`, `res_gender`, `res_civilstatus`, `res_birthdate`, `res_age`, `res_no`, `res_street`, `res_barangay`, `res_city`, `res_province`, `res_zip`, `res_img`, `res_status`, `res_timestamp`) VALUES
(17, 'Flores', 'Ralph Martin', 'Primero', '', 1, 1, '2000-10-21T16:00:00.000Z', 0, '1672', 'Balic-Balic', 'Sta. Rita', 'Olongapo City', 'Zambales', 2200, 'data:image/jpeg;base64,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', 0, '2021-04-13 02:47:39'),
(18, 'Inociete', 'Bernie', 'Legua', 'Jr.', 1, 5, '2021-03-14', 0, 'No. 1687', 'Dominguez St.', 'Sta. Rita', 'Olongapo City', 'Zambales', 2200, 'data:image/jpeg;base64,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', 0, '2021-04-13 02:49:30'),
(19, 'Inociete', 'Bernie', 'Legua', 'Jr.', 1, 4, '2000-01-18', 0, 'No. 1687', 'Dominguez', 'Sta. Rita', 'Olongapo City', 'Zambales', 2200, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAUFBQUFBQUGBgUICAcICAsKCQkKCxEMDQwNDBEaEBMQEBMQGhcbFhUWGxcpIBwcICkvJyUnLzkzMzlHREddXX0BBQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/CABEIAWgBaAMBIQACEQEDEQH/xAAdAAEAAQQDAQAAAAAAAAAAAAAABQECBAgDBgcJ/9oACAEBAAAAANsCSyVsMSWSthjP8o8C8l6NGZPbPUPb/e+MkslbDElkrYYElkrYYkslbDU8B1M6IASmym1sxJZK2GJLJWwwJLJWwxJZK3znRzyOi4Adh3h97yVsMSWSthiRLL1txZe6d8zIYAA5N/ffFtxZetuMojsVyyxHYrRzXUAAJ76dSvLLEdiuWWBHYrlliOxetfL/AIVKqVpVSqlVK7pbM8ssR2K5ZYEdiuWWI7F1e00qpVQAD2j6CcssR2K5ZYhCSyVsMSWT8+tfLlty0ADsv1jthiSyVsMCSyVsMSWT87PC65WJVStKzWyno3XvA/KFKvsByQxJZK2GBJZK2GJLJ0e1Zb++Ra5xZXYTaWUGvepFh9cJWGJLJWwxIll624sv1U0slPpRfH+Q9C5fXvSANP8AwCtPrJMXFl624yiOxXLLEdi+H6B+t7xgAOsfPLGu+suTLEdiuWWBHYrlliOxfP8A5p7VbKKFVKqVUrrJq52X6iZEsR2K5ZYEdiuWWI6L6zorsf66AAWaU+mbIdvlyOxXLLEISWSthiSwumdU6v6mAAPAveOb0aGJLJWwwJLJWwxJcnnlMPMUKqVUqpVg50l3WGJLJWwwJLJWwxJZPVYAAAB2+YhiSyVsMSJZetuLL+HqOIAAFJbs9biy9bcZRHYrlliOxV8DGKFVKqVUq7TyuWWI7FcssCOxXLLEdiuXl6OAASvY8VyyxHYrllgR2K5ZYjsVyy3TocACverMVyyxHYrlliEJLJWwxJZK2G4+sWAAlpiSyVsMSWSthgSWSthiSyVsMw+ugBldjrJZK2GJLJWwwJLJWwxJZK2GOsY9QHB2zJSWSthiSyVsMSJZetuLL1tx0CBmuQGNB+s5ay9bcWXrbjKI7FcssR2K5ZY816xfKZ9zjjY17DII7FcssR2K5ZYEdiuWWI7Fcss6l1iEtX5NmMSMv3/KjsVyyxHYrllgR2K5ZYjsVy8nXYGmPEVBkS9eftOfjOWWI7FcssQhJZK2GMDzfzPzTo22ve6I7CC6a5DU7qvpXpfpvaeZJZK2GBJZK3xLxbzPqTI5HtOxIhuISmYRmkXGxbc70b1XYPsq2GBJZPSNL/NVKXZHIm91qruCGMuVHkOtJi2jO2p2WuhiRLPLtHI8pS7JvNve6rmBHXzV41R85MW0HtW6WWZR5voJghbdkch7bsKuUiM/JEfpDwmLaB7vu0GP88OihSl2RyE9uouYngfpffB5LrKMW0Cm8ft41y07BSl2TeNwe43U0z6xybN+qmqvmoxbQHa/o/zwlvz06sBbdz8o9x2ClJXTDzKu73doSL0g4BiUAN0vZHm2iQFKXW38/I7FvhltX/Aq/Q7Op4bqqY1gBSvtO5rV/WkClLra5dxvP3Zpz5Q3o7q098kMfjACc+jUjoj5MUqoHLkDYvZJoj1BuD65hfPnFLcSoAfSvs3zMgQA5uYdu3vt+d2K2b2C8f1CDDAUqp9C+xfNKoAVyw3ukNAqPdNqdQvHxw8IAN2JHRWoAObmGyXo2k56duJ8+sIpiFKqVUqptZGazgAMup3X3vU87Ns7p4ODiAKVU9ujPJQAHLzlfYfHTl9b8fLcUAB6B1uCqAAyrjk4xy8Rj8dKqVUqpVSV/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAEEBQIDBv/aAAgBAhAAAAAAAAABMAAAAAAAAAAAAAAAAAAAAAAAAAAESc5PvogACj3bY1Odm2AAZmff5owt7QABj0gd/QyABGLX5BuWJADzzqviBd52gA8sLryAseP0YAc/OyiAn0+gABh1gC5sgAo5ACdq0ACMDy65C/rAAMiiBsXQAFPGBP0PYADn57kLO4AAMiiGtfAAFLHD6LsAAUsXo4+m6AAFT5/1nnj6joAAc/MczFzfAABiZ5t6EwAD0tRSp4Dr6bvR8qvIDu369eWfHzPne3Z00V6sBOh065zGNm7t700Yh40gt2Dpmc1cD6fr3vRBT8DrRHSh4xl6q3agjjPLFsdKdaM3TXveIGfwu+w6V6WXi/S2dLuEFSu0pHTyz87C+p9tOYIeNLrRCZ5zKXz31ntouQ4z/W8EyzM3B+qt3nIRm+9wJln4+J9Po23IMyxbEpU8DH+k2PdySjOs2BMdK3zOX9Bv+kQDPs+4mOnj8nnb30kxAlQtegmJnn4yju/TIgko2+hMTMfE0976VyExVtExMTL4zP8AofoogJcf/8QAHAEBAAIDAQEBAAAAAAAAAAAAAAEEAgMFBgcI/9oACAEDEAAAAAAmYgAAEyGIAAZAYgAGQCIAAmQDEACZAMQAJkAxAAmQCIABMieppoIgAE3cKzq245NaIABPRv0c7hV5MQACercBhwogAE9mwBx6+IAZ9GztAqTxwA2duNgGnZ58AJ9AkCNfCAB2rABT5IALvVARyKoAJ7m0CjywAHUvAcioAAt9cEcDEABl3sgrcYAAdW6HLogAC71Q4GAAAvdrSb/MYgAC56Orht3+SgAAZeryw2UvOAACJ73SODzYkAGqpleu+jY+Uw5m61mAwpacdvTn1ezn+fjkps3JDHm4scus7nU89Q1cyZbr8ilWMXVzt+i8pjWoTJesGPLGLo7563IUqkybOkVqQxXbez2nh3O0TI6Wxz9IxWr3u/pnxHjcvXMi5acqBi29P2X1f4Lz+TEyN9/DmAxy63p/sP58rcuZDPp6eeDF1vZfWfgfK58yE9WvRCIdL3/1H4V56myB1a1MYi99M+kfFPIV2REupUrDEWvrXvvjvg9bII6VXQMZhu+z+1+TfN4mQdCpqGKYy+6es+WfMEyC/TwGIffvSfMvlTIEXKsDGUPvfp/l/wAtmQic/wD/xABIEAABAwEDBwoEBAMFCAMBAAABAgMEBQAGEQcQIDNyorESEyEiMUFEYYLhFDAyUQgVcYFAkcIjQmJzoRZDUlRjkpPRJTSDo//aAAgBAQABPwDPD1fqPAZ3NU5sK0Ier9R4DO5qnNhWhGcQ2wtbiwlCSSoqOAAHaSTa8+XjJ1dcuNCqGpy09rEAB3+bn0Wr34p7xyeU3QaBDgt9zj5Mhz+gWq2WXKbWSv4m981tKv7kYiMP/wCITaVXK1OJMusTHye919a+JNiSSSTjZidNikGPMeaI723FJO7ham5Sb/Ugj4O99UQB2IXIU6j/ALV4i1E/EvlEppQmofA1Rrv55nml/sWSm12vxO3NqXIZrcCXSXVdrmvZ3AFWpldol4KeqZSKrGnMFB67DgWAfPDs0Ier9R4DO5qnNhWhD1fqPAZ3NU5sK04er9R4DO5qnNhWhD1fqPAZ3NU5sKzKUlCVKUoBIBJJ7gO82vzl/u1dwvQ6GkVeenEFaFYRmz5rH1+m17MpF8b6KWKrV3DFKiRDZJaYT6B2/qflUmtVahS0zKVUpEOQnscYcUg/ocO0HvFrlfiQmxy1DvdCElrs+PjAJcG23ah1+jXkgNz6PUmZcZfYttXYf+FQPSkjvBzQ9X6jwGdzVObCtCHq/UeAzuapzYVpw9X6jwGdzVObCtCHq/UeAzuapzYVa999rvXHpxnViYEY6lhHS88odyE2yg5Yry35W9FSswKR3QmVfWPu6ofV867V66/dGoJn0WouRnexaR0tuJHctJ6FC2TPLLRr9Jap8wIgVvDUHVv+bJ4ptD1fqPAZ3NU5sK0Ier9R4DO5qnNhWgYKB4jd97GCgeI3fexgoHiN33tznwvUw5ePWx7O3o87CcgeH3vawnIHh972sJYWC2GsCvq8rHHDHosYKB4jd97GCgeI3fexgoHiN33tznwvUw5ePWx7O3o87CcgeH3vawnIHh972tfu+0O5l16nWJDQKmmihhvla15fQhFq/eCr3nqb9Tq85cmU72qV2JHclA7kjuH8Ay67HdbdZcW262oKQtJKVJUk4ggjvHdbIhlZ/wBsaW5SaqQa5DQCpR8S12B3a+9hOQPD73tYTkDw+97WEsLBbDWBX1eVjjhj0WMFA8Ru+9jBQPEbvvYwUDxG7725z4XqYcvHrY9nb0edhOQPD73tYTkDw+97WEsLBbDWBX1eVjjhj0WMFA8Ru+9jBQPEbvvYwUDxG776EzWjYGdnXtbY46EzWjYGf8RF9Pzq8jV3YruMOk677Lkr7cdj+Cu1eCddau02swF4PxHgvDHoWnsUg+Shah1iHeCkU6rQl8qNMYQ835BXcfMdhzM69rbHHQma0bAzs69rbHHTma0bAzs69rbHHQma0bAzXwvCzdS7FarTvg4yloSexTh6qE/uogWlSn5sqTLkOlx99xbrq1dqlrOKifM/wf4arymbQKtd55zFdOeDzHkzI/8AS8zOva2xx0JmtGwM7Ova2xx05mtGwM7Ova2xx0JmtGwM34mq+Y9HoNBbXgZb65T+wx0JH8JkDrJpOUenMlWDdRYfiL/cctO8jMzr2tscdCZrRsDOzr2tscdOHq/UeAzuapzYVoQ9X6jwGb8S1RVMyluRcepAp0VhI28Xsd/+EubUTSb23ZnhWHw1TiuHZS4Cczmqc2FaEPV+o8Bnc1TmwrTh6v1HgM7mqc2FaEPV+o8Bm/EZEXGyp1V0+Kiw3kbIaDf9Gd2BNZixpjsR5EaRjzLykEIc5BwUEqPaQR8ihXdrV5ZiYdJp7sl7v5I6qAe9ajgEi12fw/U1llD146g5IfPh4p5DSfIq7TZGSLJ02jkC7TZ2nnjxXarZCLkTkK+CTKp7ncWnS6n9w7yrXwyPXouqh2W0kVKAgEl9hJ5aNtGiCUqCgcCCMDaK+iVChSE/75hDh9Qxs5qnNhWhD1fqPAZ3NU5sK04er9R4DO5qnNhWhD1fqPAZvxVQeRem7NRw19MUz+7DpPBee5d3IIye3epNQhNPsrgoW8y6gKGL39rxVa+OQIEuzLqycO8wZCv9G3OAVarUWrUKUqJVKc/EeGPUdQU4jy+4/TQAKiABibXByHyasyxUryqdiRl4KbhpHJecH+Mn6BakUalUGG3CpcFqLHT2IbThj5n7k95OjlNyOxqs3IrN22Eszxit6GkYIf2PsuzjbjTi23EFC0KKVJUCCCDgQQewjQu2vnLt3cJxxNNjE4+bYNnNU5sK0Ier9R4DO5qnNhWgYKB4jd97GCgeI3fexgoHiN33tznwvUw5ePWx7O3o87CcgeH3vawnIHh972sJYWC2GsCvq8rHHDHosYKB4jd97GCgeI3fexgoHiN33tznwvUw5ePWx7O3o87CcgeH3va34pWBJol054awLEx9gn/OQFf0ZqJTlVis0qmo+qXLaZ/8igLIQhtCEISAhIASB3ADAAZqjS6bV4yotRgMSmD2tvNhY3gbVrINc2olTkFcqnLPc0vnG/5OWkfhznpUfhr0MLR/1I5RwUq0P8OcgrBnXobCO8MxyTvKFrq5K7oXTcRIjQjKmI7JUohxadgdifkZerp/ltbj3gjNYRqjgh/DsTIQP6xoXfkczQKI3zPSiBHSen7IAsJYWC2GsCvq8rHHDHosYKB4jd97GCgeI3fexgoHiN33tznwvUw5ePWx7O3o87CcgeH3vawnIHh972sJYWC2GsCvq8rHHDHosYKB4jd97GCgeI3fexgoHiN330JmtGwM7Ova2xx0JmtGwM34hoPxeTeW/wD8nNjP/wAzzX9ebIlSfzO/0F0pxRBZelK/Ycgbyvn3wu1Hvbd2o0h8gF5vFlZ/3byelC7TYcqnTJUKW0W5DDim3UK7UqQcCMzTanXG20DFS1BKR5k4CzLSWGWmk/ShAQP0SMLM69rbHHQma0bAzs69rbHHTma0bAzs69rbHHQma0bAzZVIIqGTq97GHZT3Hv3Y/teKc34d6MW4NfrS0651EVo+TfXXx/gMulwVOg3rprOJSkJqKE7r2a5kE1K912IWGPPVOKg7JcGNg42olIWCe8AizOva2xx0JmtGwM7Ova2xx05mtGwM7Ova2xx0JmtGwLTHlMsKUk9boA/ezoD7bjbw5xC0lK0q6wUCMCCD0EG2VW4arl1wrioP5VNKlxT3NnvZNsh7QRk9pyu9yRJXvlP8A4226hbbiAtC0lKkqAIIIwIIPQQbZZrl0a6NXpy6SlbTU9LzimCrFDZQR9FsimTpiLDj3qqjHKlv9eA2rsZb7ndpVmXC062sHsIsz0vN7Q0JmtGwM7Ova2xx04er9R4DO5qnNhWhD1fqPAWraOVAUQD1VA5r6XXi3wu9OpT4AWtJXHcPa08n6V2yORn4VxokOS0UPxpkxl1B7UrQ8oEfwOVK7S72X4uDS8DzK0SVyT9mWykrs002y0200gIbQgIQlOAASkYAAdwFkJK1oQO1SgP5nCywBHd2dCHq/UeAzuapzYVpw9X6jwGdzVObCtCHq/UeAtIaQ+w60f7ySP52UlSFKSoYEEg/qM0WG1EVMLaQkPvl5QH/ABKSAT++GJ/gTAjmooqJTjIRHLCFfZClBSgNrAY5qSyXpzX2Rio/tZzVObCtCHq/UeAzuapzYVpw9X6jwGdzVObCtCHq/UeAzVyFzTvxKB1F9vkf4WjRCxH55YwU5gfTZzVObCtCHq/UeAzuapzYVoGCgeI3fexgoHiN33sYKB4jd97c58L1MOXj1sezt6POwnIHh972sJyB4fe9rCWFgthrAr6vKxxwx6LGCgeI3fexgoHiN33sYKB4jd97c58L1MOXj1sezt6POwnIHh972s7JQ80W1xwUnt6e20qIqOonDFsnoP8ABwYRK0uvoPIB6EHtJsJgCcAz0/fGwlhYLYawK+rysccMeixgoHiN33sYKB4jd97GCgeI3fe3OfC9TDl49bHs7ejzsJyB4fe9rCcgeH3vawlhYLYawK+rysccMeixgoHiN33sYKB4jd97GCgeI3ffQma0bAzs69rbHHQma0bAzoSlxaUqTilSgCPLG1VhpiSByE4NrGKf4AAk2EJmMGgG08vkJxPn34Y52de1tjjoTNaNgZ2de1tjjpzNaNgZ2de1tjjoTNaNgZ2de1tjjaqRBLjLCR10dZPmR/AUiL8RKCyOo30n9e60zWjYGdnXtbY46EzWjYGdnXtbY46czWjYGdnXtbY46EzWjYGdnXtbY45qzC+Hf51I/s3P5BXePnJBUUpAxJIAFoEUQ46G+jlnpUfM2ma0bAzs69rbHHQma0bAzs69rbHHTh6v1HgM7mqc2FaEPV+o8Bnc1TmwrM80l5tSFdhFnW1suKQrtB+bTo3+/UNnND1fqPAZ3NU5sK0Ier9R4DO5qnNhWnD1fqPAZ3NU5sK0Ier9R4DO5qnNhWeZFEhHV+sdllApJBGBB+XFjKkOf4B9RskBIASMABmh6v1HgM7mqc2FaEPV+o8Bnc1TmwrTh6v1HgM7mqc2FaEPV+o8Bnc1TmwrQrL6Y8xkEdVbfWNgQoYjpHyX30MIxPb3D7m0RKUx2cE4YoB/cjE54er9R4DO5qnNhWhD1fqPAZ3NU5sK0DBQPEbvvYwUDxG772MFA8Ru+9uc+F6mHLx62PZ29HnYTkDw+97WE5A8Pve1hLCwWw1gV9XlY44Y9FjBQPEbvvYwUDxG772MFA8Ru+9uc+F6mHLx62PZ29HnYTkDw+97WE5A8Pve1hLCwWw1gV9XlY44Y9FjBQPEbvvYwUDxG772MFA8Ru+9r1t81MjJxx/sccf3tGlKYIB6UfazbiHUhSFYjTkSW2B24rI6E2ccU6orUcTaHDCocZRe7W0dGHlYwUDxG772MFA8Ru+9uc+F6mHLx62PZ29HnYTkDw+97WE5A8Pve1hLCwWw1gV9XlY44Y9FjBQPEbvvYwUDxG772MFA8Ru+9uc+F6mHLx62PZ29HnYTkDw+97WE5A8Pve1hLCwWw1gV9XlY44Y9FjBQPEbvvYwUDxG772MFA8Ru++hM1o2BnZ17W2OOhM1o2BnZ17W2OOhel5uRNbW2rlJQjkE+eOZtxbSgUKwNmZ6FYB0ck/fusCFDEHEeWdbjbYxWsCz88nENAj/EbEknEnE2AKiAO21MfafhMchQJShKVDvBAzzNaNgZ2de1tjjoTNaNgZ2de1tjjpzNaNgZ2de1tjjoTNaNgZ2de1tjjmxAtVqyXOVHjL6nSFuDv8hZaEuJKT2Gzjam1lJzodca+hZFvj5H3H8rKmSFdHOYfpYkqJJOJzxGcBzih0/3bRJb0N4OtKwPeO4+RtAnR5zIWjoUPqQT0g/+vPNM1o2BnZ17W2OOhM1o2BnZ17W2OOnM1o2BnZ17W2OOhM1o2BnZ17W2ONqhWqRSEc5UanFiJ7cX3kt8SLVOtCYA3FcxYIHXH98H7eVu7NIZ51HR9Q7PkRmedX0jqjtzxZL0R1LzK+Sof62ReihIMdmZU40WS7yilp51KFL5PekHDG0pSVrQpCgUqQkgg452de1tjjoTNaNgZ2de1tjjpw9X6jwGdzVObCtCXey7FAaWapXoUZQP0OPJ5f8A29ptV/xA3GgctEL4yor7i01zaP5u4Wqn4i6/JChSqHDhpPYp5RfX/RarZT7+VrlCTeWUhBGrYIYTh9sGsLOOuPLU464payelSiVEnzJtk4q/5vdOnKUrF2KDFc/VroTu4W7s8tnA84nsP1aSEKWoJA6TZttLaAkaGU+r/ml7JiEKxahpEZH6o6VbxNqXeGvUVQNMrMyJ5MvKQk/qB22pWXS/tO5AkSo09A7pDI4tFNqT+JGmKIRWbuPsnvciuB3dXybUzK3k/rTZSzeNhhwp1crGOcT5uYCzD7EltLrD6HWyOqtCgpJHkRnh6v1HgM7mqc2FacPV+o8BndwDDy1YABB6T0AWvLlhubd4rZRLVUZScQWonXSNpfZar5f7zSitNMp0SE33FWL7g/c4C1Wv5fGt8oT7xTFoV2toXzTZ9LeAsSSSSST05mvoGfIzV+ZqVRpK1dWQ0Hm9tv2OgUhQIPYRZ5osrKe7u0YrPNp5R+ojQrFRbpFKqFQc+mMwtzA95SMQLPPOSHnXnVFTjiytaj3qUcSTnc+s5oFVqdKc52BUZMVeP1MuqbO7halZZ7+0vkpXU25rY7ESmgreTyVWoP4g4DykNV2jORsTr4p51H7oNrs3joV4oSpNJqbMpGPSEK6yNtJwKc7mqc2FacPV+o8Bmvpf679xoXP1J/lSFgliI30uu4cE+ZtfbKrei+i3WXZBh00/TCYVgg7Z7V5znb+gZ7t1VVErtLqIJCWH0lewehW6bJUlaUqSQQoAgj7HQeaDyMO/usRgSCOnPFZ5auUR1UnRyw1b4SgxaahWC5zwKvNtnp44aDn1nRptUqNHltTadNeiyUHqutLKVWye5fmZS2Kbe8IacOCUVFAwbP8Amp7rNuNvNocbWFoUkKSpJxBB6cQRZzVObCtAwUDxG772MFA8Ru+9jBQPEbvvbnPhephy8etj2dvR52yk5VIVyIXw7DSH6u+glhgqxDY7nHLVar1Ku1CRUalLXJlPKxW4s/6eQHcNA52voGhk8q/5xdOmOKVi6wkxnf1a6Bu6MxjEc6kbWZttTiwkWSkISEp7ANHKlVvzO9cllK8WoKEx07Q6V7x0HPrOnkuyuTrnPNUyqKXJoiyAATiuL5o/wfdNotTjVGMy/FUl1iQgKbdQsKSUq7wR97GCgeI3fexgoHiN33sYKB4jd99DKRfSHcmkLnOgOS3U8iGxjrHOPJHfaqVOdWZ8qoT5CnpUhZW44rvJ4AfIa+gaGRmr81NqlJWroebD7W030K0e3G0hktOYJHVJ6LR2eaR0jrHt0arUGqVTZ8936IzDjpH35IxAFpD7sp9+Q8oqcecU4s/dSjiToOfWfkZGspCqBUGKDVZH/wAXJdAYcV4Z1XBCtKTJYhR35Uh1LTLKFOOOK7EoSMST5C2US+ki/F5JVQUVCI3i1CaP9xpJ4q7TpHO39A0Lr1Y0S8FKqGOCGXxzmwrqr3TYEKAIIIOhNnQ6bFdlTJDbLDYxWtZwA9z3WvFldmOzGkUJhCIrLgJcfRiXsPLuTa6V/qTehCWSoRqhh1o6z9Xm2e/Ryv1b4K7zFPQrByc8AfNtrrHew0XPrPych1/TeehGkz3uXUqYhKcT2usdiV6P4gr4mnUmLdqI7g/P/tZXkwg9nrOmc7X0DRuBV/zm6tLfUrF1pHw7u010cMDndbl/Cyno0fnnG2lrQ2TyQtSRiEg4HAm15L01i80su1B4htBPNx09Vtv9B9/PMha21pWhZQtJCkqSSCCO8YWyU3jr95mZ8Wc2HkQm0YSycFqKuxCvubEFJIIIIOfKrV/zK9TzCFYtQWwwNr6laLn1n5NyLzv3PvNTKu1iUNOBMhAOsZX0LTaNIZlsMSWHA4y82lxtY7FJUMQR5HOtaW0KWtQShIJUT0AADEkm19bwrvTeerVUqJbdeKWAe5lHVR8psjkgY6ORir8iVVaQtXQ6kSGtpHVVYAkjDytHgHoW9+oTYAJAAGAtlXu3+QXrlLaRhFngyWdpX1pz5Nbt/wCzV1IDDiMJUkfEydtzuOyLPxm3x1hgruULPR3GDgodHcbVKc1TKfNnPauMy46f0QOJtKkOzJUiU8rlOvOKdWfupZxOhiB2myyConH5WQ+8RrF0BAeXi/SnOY8+ZV1m8+VquGhXGq60LwelgQ2v1e+rcx+QdALUO+zalKBJGe6VW/JLx0mcV8ltD4S6f+mvqqJ/QG0eK2wAfqVh9WfL5LC6vQIYOqiOO/8AlXh/RmxItTJQnU2nzB2PxmnR60g5lJStJChiO8Wy0zk0q7rMJpzBdQeCMO8Ntdc6CnF/pYkn5eQmtGnXyVAUvBqpRlt+trrpz/iIquL13aQhXYh2W4NrqI+QdFICQBoZPK1+fXPo0ta+U8hkMPbbPU3s+WeX8TfmW3/y0Zhnd5f9WfJ1L+NuRdt3HsiJa/dnqZ8s1a/NL3uRELxZpzKWBtq669B1OBB+ZdipGj3jodQCsBGmsOK2QocrMYKB4jd97ZbZvxWUKqshzlphtMRwf0Ry+KtDDPhbC2FsLYWaTiSdHILWsHK1Q1r+oJlsjcXnv9L+NvpeV7Hxrjf7NdQcM+RSZ8TcltnH/wCrMfa4Of1ZqlOYpdPnT3zg1FYceX+iBiQLTpj9Rmy5r6sXpDzjrh/xLOJ0FDlJI+bd0ipXeoU7n8TJgx3j0d60A2xGBtempGs3lr1RCsRJnvup2FLJT8xpQwI0bh1r8gvZRZxXyWg+G3v8t3qKzLUlCVKUcEgEk+QGJNp0lUybMlK7X3nHT61Y58gUvlU68UPHVyGXgNsFP9ObLVW/y26YgoXg9UX0tehvrr0ScLE4kn5mSGcZ+Tm7DpVq2Fsf+BZb4C186n+TXUvJUMcFMQH1IP8Aj5OCP9fmgkEGwIIx0bh1v8/unRZyl8p0sBp7/Ma6iv54Y2vVLMC7N4JQOBagSFJ/XkHDQyDy+bvDV4nc/A5f7tLA/qzZaq3+ZXsEBC8Wqawlr1uddWi6rsHzfw8TviLjy4pPTGqTqQPJaUrtl8qQgXAkxwrrT5bEf9ged4IsfmtK7Ro5Ba3iitURxfYUy2RuLtlXl/CXDrhBwLoaaHrcAOhkhl/C38pSccA+2+yf3bKhwtOmMU+FMmPqwZjMuPOH7JbTibVKc9VKhOnvnF2U+46v9Vqx0CQATYkkk5+/P36f4ZZ3XvZA8oz6N4G34iKliu7VMSe5+SsbifnAkEGySFAHQyeVv8hvhRpal8llbwYe2Hupu2y7S+ZutT4wPS/UEY7LaFaFzJfwN7buSMcAmewFbKlck2yzVr8rug5EQvB6oPJYGwnrr0XVd3zsgk34e+kiOT0Sqc8j1IUldsttS+Pv7OaBxTCjsRh/LneK/ntK6SNAdBFspV5f9obu3Bd5eLi4j639tJS0f9UnQYeUw8y8k9ZtYWn9UnG2Wa8CaxeKFEZXixCiIw23wHDu4aCjyQTY4n52Sub8Df8Au05jgFyFMH/9kFu156j+cXjrtQ5WKZM59xOyVHk2PzumyVBScdBTzq0NNqWShsHkDuSFHEgfrovPOyHVOuuFa1HFSjoOKxOH2zd+fvz9+nQ5n5dW6ROxw+HmsPY+Tawbf//EADERAAIABAQFAgUEAwEAAAAAAAECAAMEERASITAFIDFRYUFxEyIyM0AjNHKBUmJwkf/aAAgBAgEBPwD8+3/ICQOp5GZUBJOkTayazHIdIp6wsQsz/wB/BrmKqljrmimqRNABNmxqqgzGKg/KMaSb8SXY9V/A4gdZY8GAxUgg2MS64gAMt/MTq0uCqjLyUT5ZwHcW/ArjecB2HOjZHVuxgEEAjeB8xVNmnvsUkwPJXuNIJAIF9ya2SW7dgYopp+KVJvmif96Z/I7FE5Wbl9DE+cWqLg6KdyeLyZn8TEtsjo3YiJxvNme52Kdssy/YGB8zDuTA6DbYZlI7iCCCRHqdgG0SRmmyx5G7UpknP512qFM06/8AiN2tlZlDjqu1SSjKl3PVtd0i4IMT0yTXX0B02KGWHZ2I6W369LTFbuNihXLKJ7nfrUzSr/4m/OBcgCJa5EVew33XOrDuIdcjMvbmpZeecvYa/g10vK4cdG5qGXlQufXp+DXfYJ8jmlgLLQDt+DX/ALdvcQp9OQnUCE+hfYfg1wJp3tgDfBmtCi7ADqYXRVHj8FlzqynoRDrkdl7HDMcKKX8SeD6Lr+DYjW2HEJeWaHHRuTh8vJKLnq2FjurLZvTSEkKNTqYqB8gPY4V0vPIPddcVXOyr3MS1yIq9hgqD4agj0h6cdVMMjL1GyiFzpCSVX01xnC8tsCLgjuImp8OY69jhQS887N6LgBcgQIMEA6GHkDqsEEGx5lUsQBCKEWw5GFwRjxGXZ1ceoscKCXkkhrathKF5i4HGbLzC46jmkJYZj69OZxZ2HnCsl/EkP3GsS1zuq9zCrlVVHQDCnF3Pgc09MrXHQ8irmYCBppzTxaYcDYggxTU+WqmEjROn940w0Y4HkmLmQjkp1+Yntz1I1U4MwUEk6CJFaHnupFg3Q4yB+ngeWYuVyMZAtLHnnqR8qnscOJTHVUQHRoBsYpHaZIRmwliyKPGB5ahdQcVFlUc84XlthxJM0kN2OEhckmWvZRA1IEDoOeeLpftgguyjzsMLqw8YV5tTP7iB1EIbqp8RKF3XYmC6NhJF5g2XFmYeY4kbSB5YR2iSbyZZ7qIpx+p7DYPQ4U/1n22ZwtMMcUP6Uv8AlhTG9PJ/iIph9R2W0JinGrHmGNSNVMcUOkke+FEb00qKcWl/3znB/qb3MU3RtmoGinzHFD88r2w4eb0y+5iULS19tmZo7+8SPo/vZnC8sxxM/rKOy4cM1kkf7wNABgeed9xoki0tdlxdWHiOIm9SfAGHB9cw/wBhsiKgfP8A1Ev6F9triH7ud4OHA/uTfFjtT1uw9oGgA2uKLkrZvmxw4Ev329hsHBluY//EADcRAAIBAgMGBQIEBAcAAAAAAAECAwQRABASBSAhMDFRBiJBYXETQDJSgZEHFDOhIzRQYGNysf/aAAgBAwEBPwDlW+1H+wx9uP8AWDzgL7iqWYADjiOkQKNQ44npbAsnp6ZnnUS6mfh6YqIDGbgXXOmgEahiPMc6qLQ9x0OR51COEh+MEAixGHowTdTbENIqEFuO5VrqiJ7G+R51ELRE9zvuupGXuMEEEg4PNsR6YphaFORVJolPY8caSbm3MiXVIg7nFXGPpggfhxD/AEo/gcisQGPV6jEUQEFvUjmQ8JY/+ww660Ze4xELRoPbkTrqTT3IweC/A5imxB7YBuAcWtyCL4mbTFIfY82mfXCnccOVWvpit+Y82ikCuUPRuVVyfUksDwHDmg2xC+uJGPUjkVsjKEUHre/PoXvGy9jyK19U1vyjn0b6ZgPzC2+SACTh21uzdzz1JVgw9MKwZQw9d6qfRC3c8PsaOTVGUPVd6tku4QenX7GgF5wPY4O4Bc2xISXf5+x2f/mk+DiVbcdyJbAscObu3z9jQECqjue+CLgjDoVPtlGl7E9MGyqT6AYPU/P2KMUZWHUG+I3EkaMPUA4IvwwI17ZV8v04CL8W4D7EEE2By2bLrh0Hqu5tKTVKEHRRkCOIvzXlRPXDzu3TgMUzecg9sqCX6dQoJ4NwObsEVmPQC+JHMjs56k5O5EjEH1wlQejDCujdDyXdUFzh53b1sM4DaVclOlge2IZPqxI/cZbRl0QafVjkxsCcHqcDAJHEHEdQRYNxGAwYXB3mYKCTh3Lm53FNmU++ezJbxvGfTLaMuufT6LlMbRtkM4ZChseh3qh7nSOg3ozdFPtlRS/SnTjwPA4kcRo7n0GHYuzMepOVUbJbuchuQPqWx6jcdtKk4JJJJ3qc3iHtkOHHFVU66SIDq/X9M6o/gGQ3Im0ODuVLWUL336U+VhlDE88iRxrdmIAGNp+FnpdlQTR+aWMXlHznUm8mQ3Ym1IDnO15D7b9KbMR7ZeCaOCaapqHF5ItOkdr4dQ6lWFwRYjG36SGi2rVQwnygg27XylN5HPvkN2lPlYZsdTE78BtKuXgqoMW03hJ4Sxn9xg8ATjak/wDNbRrJr/ila3xgmwJwepyG7TG0lu4yc2Rj7chDZ1Pvl4QXVtunPZXP9sNxVvjE66JpV7ORiY6Y3PIiNpE+cpzaJuShuinuMeCk1bXY/lhY4PEHG0l0V9avaZx/fFSf8O3c5DeXgwOVSfIPneOcBvEuPAqXrqpu0Vv3OW3F0bX2gP8AmY4qj+EcleIGKroo5NKfKw98eA0820H7BBl4oTRtyuHcqf3GKk3k+BvDNOKL8DFUfMg5NK3mYe2PAiWp65+7qMvGC6dtTHuiHEpvIx9+TFxjT4xUnz/pyYDaVceB1tsydu8x/wDBl44XRtSNvQwA/wBzg8STkN+DjEuJzeRt85IdLqffHg1NOxkP5pGOXj9dNRSv3iI5VN/T/XEhu7fPK8Ji2waH3DH9zl/EUWj2c3u45VO+lCPfB4knfGfg+YTbAoe6hlP6HL+I0wts2H1u7ZDkK1hj/9k=', 1, '2021-04-13 02:50:11');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_profiling_roles`
--

CREATE TABLE `tbl_profiling_roles` (
  `res_roleid` int(10) NOT NULL,
  `res_role` char(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_profiling_roles`
--

INSERT INTO `tbl_profiling_roles` (`res_roleid`, `res_role`) VALUES
(0, 'resident');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sk_officials`
--

CREATE TABLE `tbl_sk_officials` (
  `sk_id` int(11) NOT NULL,
  `res_id` int(11) NOT NULL,
  `pos_id` int(11) NOT NULL,
  `sk_dateAdded` date NOT NULL DEFAULT current_timestamp(),
  `sk_image` varchar(255) NOT NULL,
  `sk_status` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_sk_officials`
--

INSERT INTO `tbl_sk_officials` (`sk_id`, `res_id`, `pos_id`, `sk_dateAdded`, `sk_image`, `sk_status`) VALUES
(3, 1, 2, '2021-04-05', 'assets/logo/sk.png', 0),
(4, 5, 4, '2021-04-05', 'assets/logo/sk.png', 1),
(5, 18, 9, '2021-04-19', 'assets/logo/sk.png', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sk_positions`
--

CREATE TABLE `tbl_sk_positions` (
  `pos_id` int(11) NOT NULL,
  `pos_name` char(50) NOT NULL,
  `pos_maxOfficial` int(2) NOT NULL DEFAULT 1,
  `pos_isArchived` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_sk_positions`
--

INSERT INTO `tbl_sk_positions` (`pos_id`, `pos_name`, `pos_maxOfficial`, `pos_isArchived`) VALUES
(2, 'Sk Chairman', 1, 0),
(3, 'Sk President', 1, 0),
(4, 'Sk Secretary', 1, 0),
(5, 'Sk Treasurer', 1, 0),
(6, 'Sk Committee', 1, 0),
(7, 'Sk Official', 1, 0),
(8, 'asdasdqwrq', 1, 1),
(9, 'Test Position', 1, 0),
(10, 'Testt', 1, 1),
(11, 'Testttttasd', 1, 0),
(12, 'asdasdasd', 1, 1),
(13, 'TestSasqwjhjghdfhg', 1, 1),
(14, 'xxxxx', 1, 1),
(15, 'qweqweasd', 1, 1),
(16, 'Try Lang Bssss', 1, 1),
(17, 'uuuyuyqwtqwtqwt', 1, 1),
(18, 'fghjfjfgjfgj', 1, 1),
(19, 'asdasdqwekjkk', 1, 1),
(20, 'TestGrame', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sk_projects`
--

CREATE TABLE `tbl_sk_projects` (
  `proj_id` int(11) NOT NULL,
  `sk_id` int(11) NOT NULL,
  `proj_title` char(50) NOT NULL,
  `proj_desc` char(200) NOT NULL,
  `proj_venue` char(50) NOT NULL,
  `proj_date` text NOT NULL,
  `proj_budget` int(11) NOT NULL,
  `proj_status` int(1) DEFAULT NULL,
  `proj_type` int(1) DEFAULT NULL,
  `proj_image` text NOT NULL,
  `proj_isApproved` int(1) DEFAULT 0,
  `proj_isArchived` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_sk_projects`
--

INSERT INTO `tbl_sk_projects` (`proj_id`, `sk_id`, `proj_title`, `proj_desc`, `proj_venue`, `proj_date`, `proj_budget`, `proj_status`, `proj_type`, `proj_image`, `proj_isApproved`, `proj_isArchived`) VALUES
(1, 4, 'Sample Project', 'Description on  Note', 'Malolos Bulacan', '2021-04-27', 0, 0, 2, 'assets/logo/imageupload.png', 0, 0),
(2, 4, 'Lakbay Kabataan', 'Tamang Walk Lang sa Gedli Pakape lang', 'Triangle', '2021-04-11', 0, 0, 1, 'assets/logo/imageupload.png', 0, 0),
(3, 4, 'ML Tournament', 'Gather and Play for fun and Prize!', 'Sta Rita Covered Court', '2021-05-07', 0, 0, 2, 'assets/logo/imageupload.png', 0, 0),
(4, 4, 'Blood Donation', 'Dugo para sa may kailangan', 'Mabayuan covered court', '2021-05-08', 0, 0, 0, 'assets/logo/imageupload.png', 1, 0),
(5, 4, 'Parokya Ni Edgar Concert', 'Concert Boss', 'Royal Parking Lot', '2021-04-17', 0, 0, 1, 'assets/logo/imageupload.png', 0, 0),
(6, 4, 'SBL Tournament', 'Basketball para sa Subic, Olongapo, Zambales,', 'Subic Gym', '2021-05-06', 0, 0, 2, 'assets/logo/imageupload.png', 0, 0),
(7, 4, 'Fun Run', 'Takbo para sa guro na laging nag tuturo', 'Boardwalk', '2021-04-14', 0, 0, 1, 'assets/logo/imageupload.png', 0, 0),
(8, 4, 'Road Widening', 'Palawak ang daan sa sta rita', 'Sta Rita Clark Street', '2021-04-15', 0, 0, 0, 'assets/logo/imageupload.png', 0, 0),
(9, 4, 'Covid Vaccine', 'Vaccination for Sta Rita Residence', 'Sta Rita Covered Court', '2021-05-28', 0, 0, 0, 'assets/logo/imageupload.png', 0, 0),
(10, 4, 'Feeding Program', 'Pakain sa mga payatot', 'Sta Rita Covered Court', '2021-05-03', 0, 0, 0, 'assets/logo/imageupload.png', 0, 0),
(11, 4, 'Dance Contest', 'Hataw para kay bayaw', 'Cristobal Court', '2021-04-14', 0, 0, 2, 'assets/logo/imageupload.png', 0, 0),
(12, 4, 'Water Fountain', 'Libreng Inumin Tubig Para sa Lahat', 'Sta Rita Court', '2021-05-07', 0, 0, 0, 'assets/logo/imageupload.png', 0, 0),
(13, 5, 'Test Lang Event', 'asdqweas', 'qweqweasd', '2021-05-06', 10000, 0, 2, 'assets/logo/imageupload.png', 0, 0),
(14, 3, 'asdasdq', 'qweqweasdas', 'qweqwe', '2021-05-05', 11231, 0, 1, 'assets/logo/imageupload.png', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `fld_id` int(11) NOT NULL,
  `fld_username` varchar(100) NOT NULL,
  `fld_password` varchar(200) NOT NULL,
  `fld_role` varchar(100) NOT NULL,
  `fld_subsytem` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`fld_id`, `fld_username`, `fld_password`, `fld_role`, `fld_subsytem`) VALUES
(1, 'profilingadmin', '$2y$10$MzA2NmFiOTU0ZWU5N2YwZ.U5oYncqq0Uz4LrXevOag3svpJNH3Ua.', 'administrator', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_blotter_case_categories`
--
ALTER TABLE `tbl_blotter_case_categories`
  ADD PRIMARY KEY (`case_id`);

--
-- Indexes for table `tbl_blotter_complainant`
--
ALTER TABLE `tbl_blotter_complainant`
  ADD PRIMARY KEY (`comp_id`),
  ADD KEY `case_id` (`case_id`);

--
-- Indexes for table `tbl_blotter_complaint_archive`
--
ALTER TABLE `tbl_blotter_complaint_archive`
  ADD PRIMARY KEY (`archive_id`);

--
-- Indexes for table `tbl_blotter_complaint_infos`
--
ALTER TABLE `tbl_blotter_complaint_infos`
  ADD PRIMARY KEY (`compinfo_id`),
  ADD KEY `case_id` (`case_id`);

--
-- Indexes for table `tbl_blotter_complaint_respondent`
--
ALTER TABLE `tbl_blotter_complaint_respondent`
  ADD PRIMARY KEY (`respondent_id`);

--
-- Indexes for table `tbl_blotter_complaint_schedule`
--
ALTER TABLE `tbl_blotter_complaint_schedule`
  ADD PRIMARY KEY (`schedule_id`);

--
-- Indexes for table `tbl_blotter_incidents_archive`
--
ALTER TABLE `tbl_blotter_incidents_archive`
  ADD PRIMARY KEY (`inci_archive_id`);

--
-- Indexes for table `tbl_blotter_incidents_infos`
--
ALTER TABLE `tbl_blotter_incidents_infos`
  ADD PRIMARY KEY (`rec_no`),
  ADD KEY `inci_id` (`inci_id`),
  ADD KEY `nature_id` (`nature_id`);

--
-- Indexes for table `tbl_blotter_incidents_nature`
--
ALTER TABLE `tbl_blotter_incidents_nature`
  ADD PRIMARY KEY (`nature_id`);

--
-- Indexes for table `tbl_blotter_incidents_reporter`
--
ALTER TABLE `tbl_blotter_incidents_reporter`
  ADD PRIMARY KEY (`inci_id`),
  ADD KEY `res_id` (`res_id`);

--
-- Indexes for table `tbl_clinic_appointments`
--
ALTER TABLE `tbl_clinic_appointments`
  ADD PRIMARY KEY (`appointment_id`),
  ADD UNIQUE KEY `appointment_id` (`appointment_id`);

--
-- Indexes for table `tbl_clinic_checkups`
--
ALTER TABLE `tbl_clinic_checkups`
  ADD PRIMARY KEY (`checkup_id`);

--
-- Indexes for table `tbl_clinic_healthprofs`
--
ALTER TABLE `tbl_clinic_healthprofs`
  ADD PRIMARY KEY (`hprof_id`);

--
-- Indexes for table `tbl_clinic_medicines`
--
ALTER TABLE `tbl_clinic_medicines`
  ADD PRIMARY KEY (`med_id`);

--
-- Indexes for table `tbl_clinic_medicine_orders`
--
ALTER TABLE `tbl_clinic_medicine_orders`
  ADD PRIMARY KEY (`medOrder_id`);

--
-- Indexes for table `tbl_clinic_med_suppliers`
--
ALTER TABLE `tbl_clinic_med_suppliers`
  ADD PRIMARY KEY (`supplier_id`);

--
-- Indexes for table `tbl_clinic_order_details`
--
ALTER TABLE `tbl_clinic_order_details`
  ADD PRIMARY KEY (`order_detail_id`);

--
-- Indexes for table `tbl_clinic_supplies`
--
ALTER TABLE `tbl_clinic_supplies`
  ADD PRIMARY KEY (`supply_id`);

--
-- Indexes for table `tbl_docuissuance_doctransaction`
--
ALTER TABLE `tbl_docuissuance_doctransaction`
  ADD PRIMARY KEY (`trans_id`),
  ADD KEY `res_id` (`res_id`),
  ADD KEY `docu_id` (`docu_id`);

--
-- Indexes for table `tbl_docuissuance_documents`
--
ALTER TABLE `tbl_docuissuance_documents`
  ADD PRIMARY KEY (`docu_id`);

--
-- Indexes for table `tbl_feedback_accounts`
--
ALTER TABLE `tbl_feedback_accounts`
  ADD PRIMARY KEY (`acc_id`),
  ADD KEY `res_id` (`res_id`);

--
-- Indexes for table `tbl_feedback_categories`
--
ALTER TABLE `tbl_feedback_categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `tbl_feedback_feedbacks`
--
ALTER TABLE `tbl_feedback_feedbacks`
  ADD PRIMARY KEY (`fb_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `acc_id` (`acc_id`);

--
-- Indexes for table `tbl_feedback_forms`
--
ALTER TABLE `tbl_feedback_forms`
  ADD PRIMARY KEY (`form_id`);

--
-- Indexes for table `tbl_feedback_genform`
--
ALTER TABLE `tbl_feedback_genform`
  ADD PRIMARY KEY (`genform_id`),
  ADD KEY `form_id` (`form_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `tbl_payment_expenses`
--
ALTER TABLE `tbl_payment_expenses`
  ADD PRIMARY KEY (`exp_id`);

--
-- Indexes for table `tbl_payment_payments`
--
ALTER TABLE `tbl_payment_payments`
  ADD PRIMARY KEY (`pt_id`),
  ADD KEY `trans_id` (`trans_id`),
  ADD KEY `checkup_id` (`checkup_id`),
  ADD KEY `order_detail_id` (`order_detail_id`);

--
-- Indexes for table `tbl_profiling_residents`
--
ALTER TABLE `tbl_profiling_residents`
  ADD PRIMARY KEY (`res_id`);

--
-- Indexes for table `tbl_profiling_roles`
--
ALTER TABLE `tbl_profiling_roles`
  ADD KEY `res_roleid` (`res_roleid`);

--
-- Indexes for table `tbl_sk_officials`
--
ALTER TABLE `tbl_sk_officials`
  ADD PRIMARY KEY (`sk_id`),
  ADD KEY `res_id` (`res_id`),
  ADD KEY `pos_id` (`pos_id`);

--
-- Indexes for table `tbl_sk_positions`
--
ALTER TABLE `tbl_sk_positions`
  ADD PRIMARY KEY (`pos_id`);

--
-- Indexes for table `tbl_sk_projects`
--
ALTER TABLE `tbl_sk_projects`
  ADD PRIMARY KEY (`proj_id`),
  ADD KEY `sk_id` (`sk_id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`fld_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_blotter_case_categories`
--
ALTER TABLE `tbl_blotter_case_categories`
  MODIFY `case_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_blotter_complainant`
--
ALTER TABLE `tbl_blotter_complainant`
  MODIFY `comp_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_blotter_complaint_infos`
--
ALTER TABLE `tbl_blotter_complaint_infos`
  MODIFY `compinfo_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_blotter_complaint_respondent`
--
ALTER TABLE `tbl_blotter_complaint_respondent`
  MODIFY `respondent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_blotter_incidents_archive`
--
ALTER TABLE `tbl_blotter_incidents_archive`
  MODIFY `inci_archive_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_blotter_incidents_infos`
--
ALTER TABLE `tbl_blotter_incidents_infos`
  MODIFY `rec_no` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_blotter_incidents_nature`
--
ALTER TABLE `tbl_blotter_incidents_nature`
  MODIFY `nature_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_blotter_incidents_reporter`
--
ALTER TABLE `tbl_blotter_incidents_reporter`
  MODIFY `inci_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_clinic_appointments`
--
ALTER TABLE `tbl_clinic_appointments`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=202118715;

--
-- AUTO_INCREMENT for table `tbl_clinic_checkups`
--
ALTER TABLE `tbl_clinic_checkups`
  MODIFY `checkup_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT for table `tbl_clinic_healthprofs`
--
ALTER TABLE `tbl_clinic_healthprofs`
  MODIFY `hprof_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_clinic_medicines`
--
ALTER TABLE `tbl_clinic_medicines`
  MODIFY `med_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_clinic_medicine_orders`
--
ALTER TABLE `tbl_clinic_medicine_orders`
  MODIFY `medOrder_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2021199519;

--
-- AUTO_INCREMENT for table `tbl_clinic_med_suppliers`
--
ALTER TABLE `tbl_clinic_med_suppliers`
  MODIFY `supplier_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_clinic_order_details`
--
ALTER TABLE `tbl_clinic_order_details`
  MODIFY `order_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- AUTO_INCREMENT for table `tbl_clinic_supplies`
--
ALTER TABLE `tbl_clinic_supplies`
  MODIFY `supply_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `tbl_docuissuance_doctransaction`
--
ALTER TABLE `tbl_docuissuance_doctransaction`
  MODIFY `trans_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_docuissuance_documents`
--
ALTER TABLE `tbl_docuissuance_documents`
  MODIFY `docu_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_feedback_accounts`
--
ALTER TABLE `tbl_feedback_accounts`
  MODIFY `acc_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_feedback_categories`
--
ALTER TABLE `tbl_feedback_categories`
  MODIFY `category_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_feedback_feedbacks`
--
ALTER TABLE `tbl_feedback_feedbacks`
  MODIFY `fb_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_payment_expenses`
--
ALTER TABLE `tbl_payment_expenses`
  MODIFY `exp_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_payment_payments`
--
ALTER TABLE `tbl_payment_payments`
  MODIFY `pt_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
