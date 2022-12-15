
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
-- TOC entry 225 (class 1259 OID 16494)
-- Name: filesource; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.filesource (
    id integer NOT NULL,
    d_id text,
    d_fname text
);


ALTER TABLE public.filesource OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16493)
-- Name: filesource_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.filesource_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.filesource_id_seq OWNER TO postgres;

--
-- TOC entry 3350 (class 0 OID 0)
-- Dependencies: 224
-- Name: filesource_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.filesource_id_seq OWNED BY public.filesource.id;


--
-- TOC entry 3199 (class 2604 OID 16497)
-- Name: filesource id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.filesource ALTER COLUMN id SET DEFAULT nextval('public.filesource_id_seq'::regclass);


--
-- TOC entry 3343 (class 0 OID 16494)
-- Dependencies: 225
-- Data for Name: filesource; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.filesource (id, d_id, d_fname) VALUES (1, 'qHk18yzg-0QOT-c5F0-wpRx-JRWaalplQcdi', '1671086515677-1278898-aaaa.zip');
INSERT INTO public.filesource (id, d_id, d_fname) VALUES (2, 'ir7YnltP-4txV-k5la-U1XN-U7rctwTuwCCe', '1671087546241-612697890-à¸«à¸±à¸§à¸à¹à¸­à¹à¸à¸´à¹à¸¡à¹à¸à¸´à¸¡ TOR.docx');


--
-- TOC entry 3351 (class 0 OID 0)
-- Dependencies: 224
-- Name: filesource_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.filesource_id_seq', 2, true);


-- Completed on 2022-12-15 14:07:34 +07

--
-- PostgreSQL database dump complete
--

