

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
-- TOC entry 225 (class 1259 OID 16476)
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
    dt timestamp without time zone
);


ALTER TABLE public.formmember OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16475)
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
-- Dependencies: 224
-- Name: formmember_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.formmember_gid_seq OWNED BY public.formmember.gid;


--
-- TOC entry 3195 (class 2604 OID 16479)
-- Name: formmember gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.formmember ALTER COLUMN gid SET DEFAULT nextval('public.formmember_gid_seq'::regclass);


--
-- TOC entry 3339 (class 0 OID 16476)
-- Dependencies: 225
-- Data for Name: formmember; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3347 (class 0 OID 0)
-- Dependencies: 224
-- Name: formmember_gid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.formmember_gid_seq', 1, false);


-- Completed on 2022-12-11 07:58:27 +07

--
-- PostgreSQL database dump complete
--

