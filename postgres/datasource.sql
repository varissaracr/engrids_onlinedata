
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
-- TOC entry 225 (class 1259 OID 16483)
-- Name: datasource; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.datasource (
    d_row integer NOT NULL,
    d_id text,
    d_name text,
    d_agency text,
    d_detail text,
    d_groups text,
    d_type text,
    d_bound text,
    d_keywords text,
    d_tmeta text,
    d_source text,
    d_tnow timestamp without time zone,
    d_tpublish timestamp without time zone,
    d_username text,
    d_iduser text,
    d_access text,
    d_sd numeric,
    d_auth text,
    d_meta text,
    d_datafiles text
);


ALTER TABLE public.datasource OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16482)
-- Name: datasource_d_row_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.datasource_d_row_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.datasource_d_row_seq OWNER TO postgres;

--
-- TOC entry 3346 (class 0 OID 0)
-- Dependencies: 224
-- Name: datasource_d_row_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.datasource_d_row_seq OWNED BY public.datasource.d_row;


--
-- TOC entry 3195 (class 2604 OID 16486)
-- Name: datasource d_row; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.datasource ALTER COLUMN d_row SET DEFAULT nextval('public.datasource_d_row_seq'::regclass);


--
-- TOC entry 3339 (class 0 OID 16483)
-- Dependencies: 225
-- Data for Name: datasource; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3347 (class 0 OID 0)
-- Dependencies: 224
-- Name: datasource_d_row_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.datasource_d_row_seq', 1, false);


-- Completed on 2022-12-14 20:17:00 +07

--
-- PostgreSQL database dump complete
--

