defmodule GitGud.Web.Mixfile do
  use Mix.Project

  def project do
    [app: :gitgud_web,
     version: "0.1.0",
     build_path: "../../_build",
     config_path: "../../config/config.exs",
     deps_path: "../../deps",
     lockfile: "../../mix.lock",
     elixir: "~> 1.4",
     elixirc_paths: elixirc_paths(Mix.env),
     compilers: [:phoenix, :gettext] ++ Mix.compilers,
     start_permanent: Mix.env == :prod,
     aliases: aliases(),
     deps: deps()]
  end

  def application do
    [mod: {GitGud.Web.Application, []},
     extra_applications: [:logger, :runtime_tools]]
  end

  #
  # Helpers
  #

  defp elixirc_paths(:test), do: ["lib", "test/support", "../gitgud/test/support"]
  defp elixirc_paths(_),     do: ["lib"]

  defp deps do
    [{:ecto, "~> 3.0", override: true},
     {:plug, "~> 1.7"},
     {:plug_cowboy, "~> 2.0"},
     {:phoenix, "~> 1.4", override: true},
     {:phoenix_html, "~> 2.12"},
     {:phoenix_pubsub, "~> 1.1"},
     {:phoenix_live_reload, "~> 1.2", only: :dev},
     {:phoenix_ecto, "~> 4.0"},
     {:absinthe, "~> 1.4"},
     {:absinthe_relay, "~> 1.4"},
     {:absinthe_phoenix, "~> 1.4"},
     {:bamboo, "~> 1.1"},
     {:gettext, "~> 0.15"},
     {:timex, "~> 3.4"},
     {:gitgud, in_umbrella: true}]
  end

  defp aliases do
    [test: ["ecto.create --quiet", "ecto.migrate", "test"]]
  end
end
