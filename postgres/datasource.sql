
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
-- TOC entry 227 (class 1259 OID 16502)
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
    d_fname text,
    d_meta text,
    d_datafiles text
);


ALTER TABLE public.datasource OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16501)
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
-- TOC entry 3350 (class 0 OID 0)
-- Dependencies: 226
-- Name: datasource_d_row_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.datasource_d_row_seq OWNED BY public.datasource.d_row;


--
-- TOC entry 3199 (class 2604 OID 16505)
-- Name: datasource d_row; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.datasource ALTER COLUMN d_row SET DEFAULT nextval('public.datasource_d_row_seq'::regclass);


--
-- TOC entry 3343 (class 0 OID 16502)
-- Dependencies: 227
-- Data for Name: datasource; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.datasource (d_row, d_id, d_name, d_agency, d_detail, d_groups, d_type, d_bound, d_keywords, d_tmeta, d_source, d_tnow, d_tpublish, d_username, d_iduser, d_access, d_sd, d_auth, d_fname, d_meta, d_datafiles) VALUES (2, 'ir7YnltP-4txV-k5la-U1XN-U7rctwTuwCCe', 'test2', 'test2', 'test2test2test2 ', '["การท่องเที่ยว","สังคมและสวัสดิการ","เกษตกรรมและการเกษตร","สถิติทางการ"]', 'ข้อมูลภูมิสารสนเทศเชิงพื้นที่', 'ระดับอำเภอ', NULL, '15/12/2565', 'test2', '2022-12-15 06:59:09.090699', '2022-12-15 07:03:25.597158', 'ศักดิ์ดา', 'sakda.homhuan@cmu.ac.th', 'publish', 0, 'editor', NULL, '[{"name":"หัวข้อเพิ่มเติม TOR.docx","type":"docx","date":"1671087538878"}]', NULL);
INSERT INTO public.datasource (d_row, d_id, d_name, d_agency, d_detail, d_groups, d_type, d_bound, d_keywords, d_tmeta, d_source, d_tnow, d_tpublish, d_username, d_iduser, d_access, d_sd, d_auth, d_fname, d_meta, d_datafiles) VALUES (1, 'qHk18yzg-0QOT-c5F0-wpRx-JRWaalplQcdi', 'test', 'test', 'test', '["การท่องเที่ยว","สาธาณสุขและสุขภาพ","การคมนาคมและโลจิตจิกส์"]', 'ข้อมูลภูมิสารสนเทศเชิงพื้นที่', 'ระดับจังหวัด', '["test"]', '15/12/2565', 'test', '2022-12-15 06:41:58.111167', '2022-12-15 06:57:30.521575', 'ศักดิ์ดา', 'sakda.homhuan@cmu.ac.th', 'publish', 0, 'editor', NULL, '[{"name":"aaaa.zip","type":"zip","date":"1671086511797"}]', NULL);


--
-- TOC entry 3351 (class 0 OID 0)
-- Dependencies: 226
-- Name: datasource_d_row_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.datasource_d_row_seq', 2, true);


-- Completed on 2022-12-15 14:06:56 +07

--
-- PostgreSQL database dump complete
--

