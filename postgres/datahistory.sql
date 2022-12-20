
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
-- TOC entry 283 (class 1259 OID 19626)
-- Name: datahitstory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.datahitstory (
    hrow integer NOT NULL,
    id_user text,
    username text,
    dataid text,
    dataname text,
    datafile text,
    d_tdate text
);


ALTER TABLE public.datahitstory OWNER TO postgres;

--
-- TOC entry 284 (class 1259 OID 19631)
-- Name: datahitstory_hrow_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.datahitstory_hrow_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.datahitstory_hrow_seq OWNER TO postgres;

--
-- TOC entry 4542 (class 0 OID 0)
-- Dependencies: 284
-- Name: datahitstory_hrow_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.datahitstory_hrow_seq OWNED BY public.datahitstory.hrow;


--
-- TOC entry 4385 (class 2604 OID 19656)
-- Name: datahitstory hrow; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.datahitstory ALTER COLUMN hrow SET DEFAULT nextval('public.datahitstory_hrow_seq'::regclass);


--
-- TOC entry 4533 (class 0 OID 19626)
-- Dependencies: 283
-- Data for Name: datahitstory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.datahitstory (hrow, id_user, username, dataid, dataname, datafile, d_tdate) VALUES (1, 'admin', 'administrator', 'ExhY1WfJ-G1DW-A4Sn-C1j9-cEkGK4UxhKqc', 'ขอบเขตจังหวัดเชียงใหม่', 'Prov_CM.zip', '11/10/2565 10:35:0');
INSERT INTO public.datahitstory (hrow, id_user, username, dataid, dataname, datafile, d_tdate) VALUES (2, 'admin', 'administrator', 'DCtGX8XZ-Hefh-2Kcm-AFZj-o97k53GIlQ95', 'ขอบเขตจังหวัดเชียงใหม่', 'Prov_CM.zip', '12/10/2565 11:15:36');
INSERT INTO public.datahitstory (hrow, id_user, username, dataid, dataname, datafile, d_tdate) VALUES (3, 'admin', 'administrator', 'm7vXVIW0-0qt9-juxc-RKTn-xvhBKiahAcyP', 'ป่าไม้', 'Amphoe_CM.zip', '26/10/2565 16:31:19');


--
-- TOC entry 4543 (class 0 OID 0)
-- Dependencies: 284
-- Name: datahitstory_hrow_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.datahitstory_hrow_seq', 3, true);


-- Completed on 2022-11-24 16:03:28 +07

--
-- PostgreSQL database dump complete
--

