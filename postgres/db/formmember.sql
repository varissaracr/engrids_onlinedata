SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16467)
-- Name: formmember; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.formmember (
    gid integer NOT NULL,
    student_id text,
    firstname_th text,
    lastname_th text,
    cmuitaccount text,
    organization_code text,
    organization_name text,
    itaccounttype_th text,
    auth text,
    dt timestamp without time zone
);


ALTER TABLE public.formmember OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16472)
-- Name: formmember_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.formmember_gid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.formmember_gid_seq OWNER TO postgres;

--
-- TOC entry 3346 (class 0 OID 0)
-- Dependencies: 223
-- Name: formmember_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.formmember_gid_seq OWNED BY public.formmember.gid;


--
-- TOC entry 3195 (class 2604 OID 16473)
-- Name: formmember gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.formmember ALTER COLUMN gid SET DEFAULT nextval('public.formmember_gid_seq'::regclass);


--
-- TOC entry 3338 (class 0 OID 16467)
-- Dependencies: 222
-- Data for Name: formmember; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.formmember (gid, student_id, firstname_th, lastname_th, cmuitaccount, organization_code, organization_name, itaccounttype_th, auth, dt) VALUES (2, '590410061', 'วริสรา', 'ไชยวงค์', 'varissara_chaiwong@cmu.ac.th', '04', 'คณะสังคมศาสตร์', 'นักศึกษาเก่า', 'admin', '2022-12-21 06:12:26.997894');
INSERT INTO public.formmember (gid, student_id, firstname_th, lastname_th, cmuitaccount, organization_code, organization_name, itaccounttype_th, auth, dt) VALUES (3, '630410010', 'คอลิค', 'เหมแก้ว', 'kolik_hemkaew@cmu.ac.th', '04', 'คณะสังคมศาสตร์', 'นักศึกษาปัจจุบัน', 'admin', '2022-12-28 07:44:18.168885');
INSERT INTO public.formmember (gid, student_id, firstname_th, lastname_th, cmuitaccount, organization_code, organization_name, itaccounttype_th, auth, dt) VALUES (1, '', 'ศักดิ์ดา', 'หอมหวล', 'sakda.homhuan@cmu.ac.th', '04', 'คณะสังคมศาสตร์', 'บุคลากร', 'admin', '2022-12-13 10:39:16.087218');
INSERT INTO public.formmember (gid, student_id, firstname_th, lastname_th, cmuitaccount, organization_code, organization_name, itaccounttype_th, auth, dt) VALUES (4, '', 'ชนิดา', 'สุวรรณประสิทธิ์', 'chanida.suwanprasit@cmu.ac.th', '04', 'คณะสังคมศาสตร์', 'บุคลากร', 'user', '2022-12-28 09:31:36.243589');


--
-- TOC entry 3347 (class 0 OID 0)
-- Dependencies: 223
-- Name: formmember_gid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.formmember_gid_seq', 4, true);


-- Completed on 2023-01-09 17:35:12

--
-- PostgreSQL database dump complete
--

