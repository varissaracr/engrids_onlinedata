

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
-- TOC entry 291 (class 1259 OID 19650)
-- Name: formuser; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.formuser (
    uid integer NOT NULL,
    id_user text,
    username text,
    email text,
    tel text,
    password text,
    dt timestamp without time zone,
    useraccess text,
    form_limit text,
    quset_limit text,
    ans_limit text,
    file_limit text,
    img_limit text,
    map_limit text
);


ALTER TABLE public.formuser OWNER TO postgres;

--
-- TOC entry 292 (class 1259 OID 19655)
-- Name: formuser_uid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.formuser_uid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.formuser_uid_seq OWNER TO postgres;

--
-- TOC entry 4546 (class 0 OID 0)
-- Dependencies: 292
-- Name: formuser_uid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.formuser_uid_seq OWNED BY public.formuser.uid;


--
-- TOC entry 4389 (class 2604 OID 19660)
-- Name: formuser uid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.formuser ALTER COLUMN uid SET DEFAULT nextval('public.formuser_uid_seq'::regclass);


--
-- TOC entry 4537 (class 0 OID 19650)
-- Dependencies: 291
-- Data for Name: formuser; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.formuser (uid, id_user, username, email, tel, password, dt, useraccess, form_limit, quset_limit, ans_limit, file_limit, img_limit, map_limit) VALUES (1, 'admin', 'administrator', 'administrator2565@email.com', '987654321', 'admin2565', '2022-08-24 09:34:18.822643', 'pro', '30', '100', '100', '5', '5', '5');
INSERT INTO public.formuser (uid, id_user, username, email, tel, password, dt, useraccess, form_limit, quset_limit, ans_limit, file_limit, img_limit, map_limit) VALUES (2, '1661309853831', 'User1', 'User1_2565@email.com', '987654321', 'user1', '2022-08-24 09:56:16.491726', 'standard', '3', '10', '50', '0', '0', '1');


--
-- TOC entry 4547 (class 0 OID 0)
-- Dependencies: 292
-- Name: formuser_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.formuser_uid_seq', 2, true);


-- Completed on 2022-11-24 15:43:38 +07

--
-- PostgreSQL database dump complete
--

